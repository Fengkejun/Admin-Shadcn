export interface MessageItem {
  id: string
  title: string
  content: string
  read: boolean
  time: string
}

const mockMessages: MessageItem[] = [
  { id: "1", title: "新用户注册通知", content: "用户 wangfang 已完成注册", read: false, time: "5 分钟前" },
  { id: "2", title: "订单退款申请", content: "订单 ORD-003 申请退款 ¥25,600", read: false, time: "1 小时前" },
  { id: "3", title: "系统更新完成", content: "v2.1.0 版本已部署成功", read: true, time: "昨天" },
]

export function useMessages() {
  return {
    messages: mockMessages,
    unreadCount: mockMessages.filter((m) => !m.read).length,
  }
}
