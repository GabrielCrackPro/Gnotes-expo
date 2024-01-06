export interface Notification {
  title: string;
  body: string;
  trigger: NotificationTrigger | null;
}

export interface NotificationTrigger {
  channelId: string;
  seconds?: number;
  minutes?: number;
  hours?: number;
}
