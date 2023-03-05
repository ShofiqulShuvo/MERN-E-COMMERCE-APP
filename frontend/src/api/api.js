export const BASE_URL = process.env.REACT_APP_SERVER_URL;

export const postConfigureJson = (data) => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
    },
  };
};

export const postConfigureJsonToken = (data, token) => {
  return {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const postConfigureMultipart = (data) => {
  return {
    method: "POST",
    body: data,
  };
};

export const postConfigureMultipartToken = (data, token) => {
  return {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const putConfigureJsonToken = (data, token) => {
  return {
    method: "put",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const putConfigureMultipartToken = (data, token) => {
  return {
    method: "put",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const deleteConfigToken = (token) => {
  return {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
