import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Camera,
  Pencil,
  Save,
  Shield,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useProfile } from "./useProfile"

const profileSchema = z.object({
  name: z.string().min(1, "请输入姓名").max(20, "姓名不超过 20 个字符"),
  email: z.string().min(1, "请输入邮箱").email("请输入有效的邮箱地址"),
  phone: z.string().regex(/^1[3-9]\d{9}$/, "请输入有效的手机号"),
  department: z.string().min(1, "请输入部门"),
  bio: z.string().max(200, "简介不超过 200 个字符").optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

/**
 * 个人中心页面
 * - 展示个人信息卡片
 * - 支持编辑个人资料
 * - 头像上传（模拟）
 */
export function ProfilePage() {
  const { profile, isEditing, setIsEditing, updateProfile, updateAvatar } = useProfile()
  const [avatarPreview, setAvatarPreview] = useState(profile.avatar)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      department: profile.department,
      bio: profile.bio,
    },
  })

  function handleEdit() {
    form.reset({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      department: profile.department,
      bio: profile.bio,
    })
    setIsEditing(true)
  }

  function handleCancel() {
    setIsEditing(false)
    form.reset()
  }

  function handleSubmit(values: ProfileFormValues) {
    updateProfile({ ...values, avatar: avatarPreview })
  }

  function handleAvatarChange() {
    // 模拟头像上传 — 生成随机颜色头像
    const colors = ["#7c3aed", "#2563eb", "#059669", "#d97706", "#dc2626"]
    const color = colors[Math.floor(Math.random() * colors.length)]
    setAvatarPreview(color)
    updateAvatar(color)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">个人中心</h1>
          <p className="text-muted-foreground">查看和管理您的个人信息</p>
        </div>
        {!isEditing && (
          <Button onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            编辑资料
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 左侧：头像卡片 */}
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback
                  className="text-3xl font-bold"
                  style={avatarPreview ? { backgroundColor: avatarPreview } : undefined}
                >
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <button
                onClick={handleAvatarChange}
                className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/80"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="default">
                <Shield className="mr-1 h-3 w-3" />
                {profile.role}
              </Badge>
              <Badge variant="secondary">{profile.department}</Badge>
            </div>
            {profile.bio && (
              <p className="text-center text-sm text-muted-foreground">
                {profile.bio}
              </p>
            )}
          </CardContent>
        </Card>

        {/* 右侧：详细信息 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
            <CardDescription>
              {isEditing ? "修改您的个人信息后点击保存" : "您的账户详细信息"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Form {...form}>
                <form
                  id="profile-form"
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>姓名</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>邮箱</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-10" type="email" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>手机号</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>部门</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>个人简介</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <textarea
                              className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 pl-10 text-sm shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="介绍一下自己..."
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-2">
                    <Button type="submit" form="profile-form">
                      <Save className="mr-2 h-4 w-4" />
                      保存
                    </Button>
                    <Button variant="outline" type="button" onClick={handleCancel}>
                      取消
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="space-y-4">
                <InfoRow icon={User} label="姓名" value={profile.name} />
                <InfoRow icon={Mail} label="邮箱" value={profile.email} />
                <InfoRow icon={Phone} label="手机号" value={profile.phone} />
                <InfoRow icon={Shield} label="角色" value={profile.role} />
                <InfoRow icon={Building2} label="部门" value={profile.department} />
                <InfoRow icon={FileText} label="简介" value={profile.bio || "未填写"} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

/** 信息行组件 */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof User
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-lg border p-3">
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="w-16 text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}
