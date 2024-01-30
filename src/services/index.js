import axios from "axios";
import LoaderRef from "../components/loader";
import { Toast } from "../components/Toast";
import { getTokenFromStore } from "../utils";

export const request = ({ url, method, data, isLoader = true }) =>
  new Promise((resolve, reject) => {
    let token = getTokenFromStore();
    let config = {
      url: "http://doodlebluelive.com:2205/" + url,
      method: method,
      data: data ? data : null,
      //   withCredentials: true,
      //   crossdomain: true,
      headers: {
        Authorization: token ? token : "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, PUT",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    };

    if (data == null) {
      delete config["data"];
    }
    showLoader(isLoader);

    axios(config)
      .then((res) => {
        showLoader(false);
        return resolve(res);
      })
      .catch(({ response }) => {
        showLoader(false);
        if (response) {
          let { status, data } = response;
          let { message } = data;
          Toast({ type: "error", message: message });
          if (status === 401) {
            window.location.href = "/auth/login";
          }
        } else {
        }

        return reject(response);
      });
  });

const showLoader = (status) => {
  if (LoaderRef && LoaderRef.render && LoaderRef.render.defaultProps) {
    LoaderRef.render.defaultProps.setLoaderStatus(status);
  }
};
