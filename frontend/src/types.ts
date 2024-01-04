export type Id = string | number ;
export type Column = {
    id:Id ;
    title: string;
    color:string
}

export type Task = {
    id:Id;
    columnId:Id;
    todoTitle:string;
    assignedTo:string;

    taskId:string;

}

export type Event = {
    eventId:string,
    eventTitle:string,
    eventDescription:string,
    eventStartTime:string,
    eventEndTime:string,
    eventDateNepali:string,
    eventDateEnglish:string,
    userDetails:string
}

export type User = {
    message:string,
    status:number,
    data: {
        _id: string,
        username: string,
        email: string,
        role: string,
        createdAt: string,
        updatedAt: string,
        __v: number
    }
}

export type TaskType = {
    taskTitle:string,
    taskDescription:string,
    _id:string
}