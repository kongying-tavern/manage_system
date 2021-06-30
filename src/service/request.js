import axios from 'axios'
import md5 from "js-md5";

//请求点位数据信息
function options_type_select() {
    let ts = Date.now();
    let sign = md5(ts + "site.yuanshen");
    return axios({
        method: "get",
        url: "http://8.129.180.37:8089/api/option",
        headers: { ts: ts, sign: sign }
    });
}
export {options_type_select}