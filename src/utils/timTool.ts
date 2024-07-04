
let tim: TimTool;
let timPromise: Promise<any>;

interface GetMessageListOptions {
    userID: string;
    appid: string;
}

interface TimTool {
    getMessageList(options: GetMessageListOptions): Promise<any>;
    getView({ }: any): any;
    deleteConversation(conversationID: any): any;
}

export function getTimTool(): Promise<TimTool> {
    return new Promise((resolve, reject) => {
        if (import.meta.env.VITE_ZLB) {
            return
        }
        if (tim) return resolve(tim);

        if (!timPromise) {

            timPromise = import('@/static/timTool')

        }
        timPromise.then(({ default: TimTool }) => {
            tim = TimTool
            resolve(TimTool)

        })

    })
}