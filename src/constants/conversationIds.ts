import { createTodo } from "@/conversations/createTodo";
import { getWeather } from "@/conversations/getWeather";
import { setTodoNotification } from "@/conversations/setTodoNotification";
import { setTodoText } from "@/conversations/setTodoText";
import { setWeatherNotification } from "@/conversations/setWeatherNotification";

export const CREATE_TODO = createTodo.name;
export const GET_WEATHER = getWeather.name;
export const SET_TODO_NOTIFICATION = setTodoNotification.name;
export const SET_TODO_TEXT = setTodoText.name;
export const SET_WEATHER_NOTIFICATION = setWeatherNotification.name;
