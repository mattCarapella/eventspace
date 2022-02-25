import axios, { AxiosError, AxiosResponse } from 'axios';
import { config } from 'process';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Event } from '../models/event';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

axios.defaults.baseURL = 'http://localhost:5000/api';


// Interceptors can intercept requests or responses before they're handled and perform operations


// Every time a request is made, check to see if there is a token and if there is include in the auth header
axios.interceptors.request.use(config => {
	const token = store.commonStore.token;
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

axios.interceptors.response.use(async response => {
	// Do something before request is sent. Any status code that lie within the range of 2xx cause this function to trigger
	await sleep(1000);
	return response;
}, (error: AxiosError) => {
	// Do something with response error. Any status codes that falls outside the range of 2xx cause this function to trigger
	const {data, status, config} = error.response!; // we can use ! here as we know there will always be an error
	switch(status) {
    	case 400: 
      		if (typeof data === 'string') {
        		toast.error(data);
      		}
			if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
				// Bad GUID
				history.push('/not-found');
			}
			if (data.errors) {
				// Validation error response
				const modalStateErrors = [];
				// loop over all errors, push them into array then flatten the array to we see the validation error strings rather than objects
				for (const key in data.errors) {
					if (data.errors[key]) {
						modalStateErrors.push(data.errors[key]);
					}
				}
				throw modalStateErrors.flat();
			} else {
				toast.error(data);
			}
			break;
		case 401:
			toast.error('Unauthorized');
			break;
    	case 404:
			history.push('/not-found'); // history is imported from index.tsx
			break;
    	case 500:
			store.commonStore.setServerError(data);
			history.push('/server-error');
			break;
  	}
	// Promise represents the end of a completed async operation
	return Promise.reject(error);
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
	get: <T>(url: string) => axios.get<T>(url).then(responseBody),
	post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
	del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Events = {
	list: () => requests.get<Event[]>('/events'),
	details: (id: string) => requests.get<Event>(`/events/${id}`),
	create: (event: Event) => axios.post<void>('/events', event),
	update: (event: Event) => axios.put<void>(`/events/${event.id}`, event),
	delete: (id: string) => axios.delete<void>(`/events/${id}`)
}

const Account = {
	current: () => requests.get<User>('/account'),
	login: (user: UserFormValues) => requests.post<User>('/account/login', user),
	signup: (user: UserFormValues) => requests.post<User>('/account/signup', user)
}

const agent = {
	Events,
	Account
}

export default agent;
