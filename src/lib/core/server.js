const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// token
// export const authHeader=async()=>{
//     const token= await getUserToken();
// }

export const serverMutation = async (path, data, method = "POST") => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // "Authorization":`Bearer ${token}` later we will add this for auth
    },
    body: JSON.stringify(data),
  });
  // it will handle the status code and redirect if needed and convert data into json
  return handleStatusCode(res);
};





export const serverFetch=async(path)=>{

    const res=await fetch(`${baseUrl}${path}`)
    return handleStatusCode(res)
}




const handleStatusCode = (res) => {
  if (res.status === 401) {
    redirect("/unauthorized");
  } else if (res.status === 403) {
    redirect("/forbidden");
  }
  return res.json();
};
