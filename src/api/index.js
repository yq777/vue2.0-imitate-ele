import {ajaxGet} from "../utils/instance";

export const getSellers = () => ajaxGet('/api/seller');

export const getGoods = () => ajaxGet('/api/goods');

export const getRatings = () => ajaxGet('/api/ratings');
