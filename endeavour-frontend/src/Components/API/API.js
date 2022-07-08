import axios from 'axios'


const Signup = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/signup/", data);
    return await response.data;
  } catch (err) { }
};

const Signin = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/login/", data);
    return response.data;
  } catch (err) { }
};

const UpdateUser = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/update/", data);
    return response.data;
  } catch (err) { }
};

const VerifyEmail = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/verify-email/", data);
    return response.data;
  } catch (err) { }
};

const GetWorkshops = async (data) => {
  try {
    const response = await axios.get("http://localhost:8000/get-workshops/", data);
    return response.data;
  } catch (err) { }
};

const GetIdeas = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/get-ideas/", data);
    return response.data;
  } catch (err) { }
}

const CreateIdea = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/create-idea/", data);
    return response.data;
  } catch (err) { }
}

const GetSingleIdea = async (id) => {
  try {
    const response = await axios.get("http://localhost:8000/get-idea/"+id);
    return response.data;
  } catch (error) { }
}

const GetSingleWorkshop = async (id) => {
  try {
    const response = await axios.post("http://localhost:8000/get-workshop/"+id);
    return response.data;
  } catch (error) { }
}

const DeleteIdea = async (data) => {
  try {
    const response = await axios.delete("http://localhost:8000/create-idea/", {data: data});
    return response.data;
  } catch (err) { }
}
const UpdateRegisterUser = async (data) => {
  try {
    const response = await axios.patch(process.env.REACT_APP_API_BASEURL + "api/v0/user/update-user/", data);
    return response.data
  } catch (error) { }
}
const PostMessage = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/post-message/", data);
    return response.data;
  } catch (error) { }
}
const ApproveIdea = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/approve-idea/", data);
    return response.data;
  } catch (error) { }
}
const CreateNewWorkshop = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/create-workshop/", data);
    return response.data;
  } catch (error) { }
}

const DeleteWorkshop = async (data) => {
  try {
    const response = await axios.delete("http://localhost:8000/create-workshop/", {data: data});
    return response.data;
  } catch (err) { }
}

const GetMentorWorkshops = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/get-mentor-workshops/", data);
    return response.data;
  } catch (err) { }
};

const JoinNewWorkShop = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/join-workshop/", data);
    return response.data;
  } catch (err) { }
}

const GetJoinedWorkShop = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/get-joined-workshops/", data);
    return response.data;
  } catch (err) { }
}

const DeleteJoinedWorkShop = async (data) => {
  try {
    const response = await axios.delete("http://localhost:8000/get-joined-workshops/", {data: data });
    return response.data;
  } catch (err) { }
}

const MarkFavorite = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/mark-favorite/", data);
    return response.data;
  } catch (err) { }
}

const GetFavoriteideas = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/get-favorite/", data);
    return response.data;
  } catch (err) { }
}

const DeleteFavorite = async (data) => {
  try {
    const response = await axios.delete("http://localhost:8000/get-favorite/", {data: data });
    return response.data;
  } catch (err) { }
}

const GetMessages = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/get-messages/", data);
    return response.data;
  } catch (err) { }
}

const PostReply = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/post-reply/", data);
    return response.data;
  } catch (err) { }
}

const GetReply = async (data) => {
  try {
    const response = await axios.get("http://localhost:8000/get-messages/" + data);
    return response.data;
  } catch (err) { }
}

const InviteParticipants = async (data) => {
  try {
    const response = await axios.post("http://localhost:8000/invite-participants/", data);
    return response.data;
  } catch (err) { }
}

export {
  Signup,
  Signin,
  UpdateUser,
  VerifyEmail,
  GetWorkshops,
  GetIdeas,
  CreateIdea,
  GetSingleIdea,
  UpdateRegisterUser,
  DeleteIdea,
  GetSingleWorkshop,
  PostMessage,
  ApproveIdea,
  CreateNewWorkshop,
  DeleteWorkshop,
  GetMentorWorkshops,
  JoinNewWorkShop,
  GetJoinedWorkShop,
  DeleteJoinedWorkShop,
  MarkFavorite,
  GetFavoriteideas,
  DeleteFavorite,
  GetMessages,
  PostReply,
  GetReply,
  InviteParticipants,
};
