"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "register">("login");

  // ⭐ 星の位置はクライアントマウント時にだけ生成（SSR不一致防止）
  const [stars, setStars] = useState<
    { top: string; left: string; opacity: number }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 60 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.8,
    }));
    setStars(generated);
  }, []);

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-emerald-50 flex flex-col items-center justify-center"
      style={{ imageRendering: "pixelated" }}>
      {/* ==== 背景 ==== */}
      <div className="absolute inset-0 -z-50 bg-gradient-to-b from-[#0b132b] via-[#1c2541] to-[#3a506b]" />

      {/* 星（useEffect 後のみ描画） */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: "2px",
            height: "2px",
            top: star.top,
            left: star.left,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* 山・森（背景層） */}
      <div className="absolute bottom-32 left-0 right-0 h-64 bg-gradient-to-t from-[#1b2a38] to-transparent -z-40" />
      <div className="absolute bottom-24 left-0 right-0 h-64 bg-gradient-to-t from-[#2e3e28] to-transparent -z-30 opacity-90" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#24351f] to-transparent -z-20" />

      {/* ==== タイトル ==== */}
      <header className="mb-12 text-center select-none">
        <h1
          className="text-6xl md:text-7xl font-extrabold tracking-wide"
          style={{
            color: "#63b348",
            textShadow:
              "3px 3px 0 #2b5311, -2px -2px 0 #2b5311, 2px -2px 0 #2b5311, -2px 2px 0 #2b5311",
          }}>
          テラリア
        </h1>
      </header>

      {/* ==== メインメニュー ==== */}
      <main className="flex flex-col items-center gap-6 text-center">
        {/* クイックスタート */}
        <PixelButton
          className="text-2xl md:text-3xl px-8 py-4 w-full max-w-xs"
          onClick={() => router.push("/game")}>
          クイックスタート
        </PixelButton>

        {/* ログイン / 新規登録 */}
        <AuthDialog
          tab={tab}
          setTab={setTab}
          trigger={
            <PixelButton className="text-2xl md:text-3xl px-8 py-4 w-full max-w-xs gap-2 bg-indigo-600 hover:bg-indigo-700">
              ログイン / 新規登録
            </PixelButton>
          }
        />
      </main>

      {/* バージョン表記（左下） */}
      <footer className="absolute bottom-4 left-4 text-xs text-emerald-200 opacity-70 select-none">
        v0.1.0 build 001
      </footer>
    </div>
  );
}

/* ===== Pixel風ボタン ===== */
function PixelButton(props: React.ComponentProps<typeof Button>) {
  const { className, ...rest } = props;
  return (
    <Button
      {...rest}
      className={[
        "relative select-none font-black tracking-wide box-border",
        "flex items-center justify-center whitespace-nowrap overflow-hidden",
        "w-full max-w-xs",
        "bg-emerald-600 text-emerald-50 hover:bg-emerald-700",
        "rounded-md border-2 border-[#14532d] shadow-[4px_4px_0_0_#064e3b]",
        "before:absolute before:inset-0 before:content-[''] before:pointer-events-none before:rounded-inherit before:border-2 before:border-emerald-300/70",
        className || "",
      ].join(" ")}
    />
  );
}

/* ===== 認証モーダル ===== */
function AuthDialog({
  tab,
  setTab,
  trigger,
}: {
  tab: "login" | "register";
  setTab: (v: "login" | "register") => void;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-emerald-50">
        <DialogHeader>
          <DialogTitle className="font-black">アカウント</DialogTitle>
        </DialogHeader>
        <Tabs
          value={tab}
          onValueChange={(v) => setTab(v as typeof tab)}
          className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">ログイン</TabsTrigger>
            <TabsTrigger value="register">新規登録</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <AuthForm mode="login" />
          </TabsContent>
          <TabsContent value="register">
            <AuthForm mode="register" />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

/* ===== 認証フォーム ===== */
function AuthForm({ mode }: { mode: "login" | "register" }) {
  return (
    <div className="rounded-md bg-emerald-100/80 p-4 border-2 border-[#14532d] shadow-[4px_4px_0_0_#064e3b] overflow-hidden box-border">
      <form className="space-y-4">
        {mode === "register" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="r-name" className="font-bold">
                ユーザー名
              </Label>
              <Input
                id="r-name"
                placeholder="New Adventurer"
                className="bg-emerald-50/80 border-emerald-700/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="r-mail" className="font-bold">
                メール
              </Label>
              <Input
                id="r-mail"
                type="email"
                placeholder="you@example.com"
                className="bg-emerald-50/80 border-emerald-700/40"
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="id" className="font-bold">
            ID
          </Label>
          <Input
            id="id"
            placeholder="Guide"
            className="bg-emerald-50/80 border-emerald-700/40"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pw" className="font-bold">
            パスワード
          </Label>
          <Input
            id="pw"
            type="password"
            placeholder="••••••••"
            className="bg-emerald-50/80 border-emerald-700/40"
          />
        </div>
        <PixelButton className="w-full">
          {mode === "login" ? "ログイン" : "アカウント作成"}
        </PixelButton>
      </form>
    </div>
  );
}
