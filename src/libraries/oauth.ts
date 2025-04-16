import logger from "./logger.js"

export type GoogleUserInfo = {
    sub: string
    name: string
    given_name: string
    family_name: string
    picture: string
    email: string
    email_verified: string
    locale: string
}


export default class Oauth {
    public static async getGoogleUserInfo(accessToken: string): Promise<GoogleUserInfo> {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })

        if (!res.ok) {
            throw new Error(`Failed to fetch user info: ${res.statusText}`)
        }

        const data = await res.json()
        logger.debug(data)
        return data
    }
}