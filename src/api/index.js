import {ajaxGet} from "../utils/instance";

export const getSellers = (id) => ajaxGet('/api/seller', {id});

export const getGoods = () => ajaxGet('/api/goods');

export const getRatings = () => ajaxGet('/api/ratings');
