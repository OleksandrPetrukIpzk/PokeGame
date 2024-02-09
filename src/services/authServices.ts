import $api from "@/http";

export default class AuthServices {
    static async logIn(name: string, email: string, password: string) {
        return $api.post('user/login', {name, email, password})
    }
    static async create(name:string, email: string, password: string) {
        return $api.post('user', {name, email, password})
    }
    static async changeEmail(id:string, email: string) {
        return $api.post('user/email/'+id, {email})
    }

    static async changeName(id:string, userName: string) {
        return $api.post('user/name/'+id, {userName})
    }
    static async changeImg(id:string, img: string) {
        return $api.post('user/img/'+id, {img})
    }

    static async changePassword(id:string, password: string) {
        return $api.post('user/password/'+id, {password})
    }

    static async delete(id:string) {
        return $api.delete(`user/${id}`)
    }
}
