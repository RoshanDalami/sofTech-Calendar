export type Id = string | number ;
export type Column = {
    id:Id ;
    title: string;
    color:string
}

export type Task = {
    id:Id;
    columnId:Id;
    content:string;
    assignedTo:string;
    createdAt: string;
    projectId:string;
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