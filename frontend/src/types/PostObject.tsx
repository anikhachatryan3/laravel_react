import UserObject from "./UserObject";

interface PostObject {
    id: Number;
    title: string;
    description: string;
    user_id: Number;
    user: UserObject;
    created_at: string;
}

export default PostObject;
