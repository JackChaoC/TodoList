import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const utils = {
    transformToFrontIssueLists(array) {
        return array.map((item, index, arr) => {
            item.state = item.state ? true : false;
            return item;
        })
    },
    //日期格式化工具
    formatDate(date) {
        return dayjs.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
    },
   
}



export default utils