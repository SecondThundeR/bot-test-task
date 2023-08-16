import { createTodo } from "@/conversations/createTodo";
import { getWeather } from "@/conversations/getWeather";
import { setWeatherNotification } from "@/conversations/setWeatherNotification";
import { updateTodoText } from "@/conversations/updateTodoText";

export const CREATE_TODO = createTodo.name;
export const GET_WEATHER = getWeather.name;
export const SET_WEATHER_NOTIFICATION = setWeatherNotification.name;
export const UPDATE_TODO_TEXT = updateTodoText.name;
