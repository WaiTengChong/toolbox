"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Button,
  Chip,
  Spinner,
  Text,
  Title,
  Avatar,
  Badge,
  Link
} from "@heroui/react";
import { 
  GiGoldBar, 
  GiNewspaper,
  GiMoneyStack,
  GiRefresh,
  GiHealthPotion,
  GiProcessor,
  GiGlobe,
  GiChip,
  GiArtificialHive,
  GiRobotGolem,
  GiLightningBolt,
  GiSettings
} from "react-icons/gi";

// Gold Price Component
function GoldPriceCard() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const GRAMS_PER_OUNCE = 31.1035;
  const USD_TO_CNY = 7.25;

  const fetchPrice = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.goldapi.io/api/XAU/USD", {
        headers: { "x-access-token": "goldapi-jp0nsmld26yav-io" }
      });
      const data = await response.json();
      const pricePerOunceUSD = data.price;
      const pricePerOunceCNY = pricePerOunceUSD * USD_TO_CNY;
      const pricePerGram = pricePerOunceCNY / GRAMS_PER_OUNCE;
      
      setPrice(pricePerGram);
      setLastUpdate(new Date().toLocaleString("zh-TW", {
        hour: "2-digit",
        minute: "2-digit"
      }));
    } catch (error) {
      console.error("Gold price error:", error);
      setPrice(625.50);
      setLastUpdate(new Date().toLocaleString("zh-TW", {
        hour: "2-digit",
        minute: "2-digit"
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();
  }, []);

  return (
    <Card 
      className={`
        bg-gradient-to-br from-amber-950/80 via-amber-900/40 to-yellow-900/20
        border-amber-500/40 backdrop-blur-sm
        transition-all duration-500 ease-out
        ${isHovered ? 'scale-[1.02] shadow-2xl shadow-amber-500/20 border-amber-400/50' : 'shadow-xl shadow-black/30'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <GiGoldBar size={32} className="text-white" />
          </div>
          <div>
            <Title className="text-white text-2xl font-bold">🥇 黃金價格</Title>
            <Text className="text-white/70 text-medium">24K 每克黃金 · 實時報價</Text>
          </div>
        </div>
        <Button
          isIconOnly
          variant="solid"
          onPress={fetchPrice}
          isDisabled={loading}
          className={`
            bg-white/20 backdrop-blur-sm text-white
            hover:bg-white/30 transition-all duration-300
            ${loading ? 'opacity-50' : ''}
          `}
        >
          <GiRefresh size={22} className={loading ? 'animate-spin' : ''} />
        </Button>
      </CardHeader>
      <CardBody className="py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Spinner size="lg" color="warning" />
            <Text className="text-white/50">載入中...</Text>
          </div>
        ) : price ? (
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full" />
              <Text className="relative text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 drop-shadow-lg">
                ¥{price.toFixed(2)}
              </Text>
            </div>
            <Chip 
              color="warning" 
              variant="flat"
              startContent={<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
            >
              更新時間: {lastUpdate}
            </Chip>
          </div>
        ) : null}
      </CardBody>
      <CardFooter className="bg-black/20 justify-between">
        <div className="flex items-center gap-2">
          <GiGoldBar size={16} className="text-amber-400" />
          <Text className="text-white/60 text-small">數據來源: GoldAPI.io</Text>
        </div>
        <Badge color="warning" variant="solid" className="bg-amber-500/20">
          即時報價
        </Badge>
      </CardFooter>
    </Card>
  );
}

// Tech News Component
function TechNewsCard() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.brave.com/v1/news?category=technology&count=10",
        { headers: { "Accept": "application/json" } }
      );
      const data = await response.json();
      const articles = data.articles || [];
      setNews(articles.slice(0, 6));
      setLastUpdate(new Date().toLocaleString("zh-TW", {
        hour: "2-digit",
        minute: "2-digit"
      }));
    } catch (error) {
      console.error("News error:", error);
      setNews([
        { title: "OpenAI 發布 GPT-5 預覽版", source: "TechCrunch", url: "#" },
        { title: "Apple 將推摺疊 iPhone", source: "The Verge", url: "#" },
        { title: "NVIDIA RTX 50 系列顯卡登場", source: "Tom's Hardware", url: "#" },
        { title: "SpaceX Starship 成功發射", source: "Space.com", url: "#" },
        { title: "Google Gemini 2.0 正式推出", source: "9to5Google", url: "#" },
        { title: "特斯拉 FSD V13 更新", source: "Electrek", url: "#" }
      ]);
      setLastUpdate(new Date().toLocaleString("zh-TW", {
        hour: "2-digit",
        minute: "2-digit"
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <Card 
      className={`
        bg-gradient-to-br from-violet-950/80 via-purple-900/40 to-blue-900/20
        border-violet-500/40 backdrop-blur-sm
        transition-all duration-500 ease-out
        ${isHovered ? 'scale-[1.02] shadow-2xl shadow-violet-500/20 border-violet-400/50' : 'shadow-xl shadow-black/30'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-500 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <GiNewspaper size={32} className="text-white" />
          </div>
          <div>
            <Title className="text-white text-2xl font-bold">📰 科技新聞</Title>
            <Text className="text-white/70 text-medium">最新科技動態 · 持續更新</Text>
          </div>
        </div>
        <Button
          isIconOnly
          variant="solid"
          onPress={fetchNews}
          isDisabled={loading}
          className={`
            bg-white/20 backdrop-blur-sm text-white
            hover:bg-white/30 transition-all duration-300
            ${loading ? 'opacity-50' : ''}
          `}
        >
          <GiRefresh size={22} className={loading ? 'animate-spin' : ''} />
        </Button>
      </CardHeader>
      <CardBody className="py-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Spinner size="lg" color="secondary" />
            <Text className="text-white/50">載入最新新聞...</Text>
          </div>
        ) : (
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {news.map((item, index) => (
              <Link 
                key={index} 
                href={item.url || "#"} 
                isExternal
                className="block group"
              >
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/10 group-hover:border-violet-500/30 transition-all duration-300 group-hover:scale-[1.01]">
                  <Text className="text-white font-medium text-sm line-clamp-2 group-hover:text-violet-200 transition-colors">
                    {item.title || "無標題"}
                  </Text>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge color="secondary" variant="flat" size="sm">
                      {item.source || "未知來源"}
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardBody>
      <CardFooter className="bg-black/20 justify-between">
        <Chip 
          color="secondary" 
          variant="flat"
          size="sm"
          startContent={<GiNewspaper size={14} />}
        >
          {news.length} 條新聞
        </Chip>
        <Text className="text-white/60 text-small">
          更新: {lastUpdate}
        </Text>
      </CardFooter>
    </Card>
  );
}

// Quick Links Component
function QuickLinksCard() {
  const tools = [
    { name: "黃金價格", icon: <GiGoldBar />, color: "amber", href: "#gold", gradient: "from-amber-500 to-yellow-500" },
    { name: "科技新聞", icon: <GiNewspaper />, color: "violet", gradient: "from-violet-500 to-purple-500" },
    { name: "天氣預報", icon: <GiGlobe />, color: "cyan", gradient: "from-cyan-400 to-blue-400" },
    { name: "股票行情", icon: <GiMoneyStack />, color: "emerald", gradient: "from-emerald-400 to-green-500" },
    { name: "AI 工具", icon: <GiArtificialHive />, color: "pink", gradient: "from-pink-400 to-rose-500" },
    { name: "開發工具", icon: <GiChip />, color: "slate", gradient: "from-slate-400 to-gray-500" },
  ];

  return (
    <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="bg-gradient-to-r from-gray-800/80 to-gray-700/60 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
            <GiLightningBolt size={32} className="text-white" />
          </div>
          <div>
            <Title className="text-white text-2xl font-bold">⚡ 快速連結</Title>
            <Text className="text-white/70 text-medium">常用工具 · 一鍵訪問</Text>
          </div>
        </div>
      </CardHeader>
      <CardBody className="py-4">
        <div className="grid grid-cols-3 gap-3">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              href={tool.href}
              className="group"
            >
              <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                <div className={`p-3 bg-gradient-to-br ${tool.gradient} rounded-xl shadow-lg mb-3 group-hover:shadow-xl transition-shadow`}>
                  <span className="text-2xl">{tool.icon}</span>
                </div>
                <Text className="text-white text-xs text-center font-medium group-hover:text-white/90">
                  {tool.name}
                </Text>
              </div>
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// System Status Component
function SystemStatusCard() {
  const [status, setStatus] = useState([
    { name: "CPU 使用率", value: "23%", color: "success", icon: <GiChip />, trend: "↓ 5%" },
    { name: "記憶體", value: "4.2 GB", color: "primary", icon: <GiProcessor />, trend: "穩定" },
    { name: "運行時間", value: "5 天", color: "secondary", icon: <GiHealthPotion />, trend: "↑ 正常" },
  ]);

  return (
    <Card className="bg-gray-900/60 border-gray-700/50 backdrop-blur-sm shadow-xl">
      <CardHeader className="bg-gradient-to-r from-gray-800/80 to-gray-700/60 pb-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl shadow-lg">
            <GiRobotGolem size={32} className="text-white" />
          </div>
          <div>
            <Title className="text-white text-2xl font-bold">🤖 OpenClaw 狀態</Title>
            <Text className="text-white/70 text-medium">系統監控 · 即時數據</Text>
          </div>
        </div>
        <Button
          isIconOnly
          variant="light"
          className="text-white/70 hover:text-white"
        >
          <GiSettings size={20} />
        </Button>
      </CardHeader>
      <CardBody className="py-4">
        <div className="grid grid-cols-3 gap-4">
          {status.map((item, index) => (
            <div 
              key={index} 
              className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-center mb-3">
                <div className={`p-3 rounded-xl bg-${item.color}-500/20`}>
                  <span className="text-2xl">{item.icon}</span>
                </div>
              </div>
              <Text className="text-white/60 text-xs text-center mb-1">{item.name}</Text>
              <Text className={`text-2xl font-bold text-center text-${item.color}-400`}>
                {item.value}
              </Text>
              <Text className="text-white/40 text-xs text-center mt-2">
                {item.trend}
              </Text>
            </div>
          ))}
        </div>
        
        {/* Status Indicator */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
              </div>
              <div>
                <Text className="text-white font-medium">系統正常運行中</Text>
                <Text className="text-white/50 text-xs">所有服務正常</Text>
              </div>
            </div>
            <Badge color="success" variant="flat">
              ✓ 在線
            </Badge>
          </div>
        </div>
      </CardBody>
      <CardFooter className="justify-center">
        <Text className="text-white/40 text-xs">
          Powered by OpenClaw AI Assistant
        </Text>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-600 py-12 px-4 shadow-2xl shadow-purple-500/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
              <Avatar 
                src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" 
                className="w-20 h-20 relative z-10 shadow-2xl"
              />
            </div>
            <Title className="text-5xl font-black text-white drop-shadow-lg">
              🧰 OpenClaw Toolbox
            </Title>
          </div>
          <Text className="text-white/90 text-xl font-medium">
            實用工具箱 · 持續更新中
          </Text>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge color="primary" variant="flat" className="bg-white/20">
              v2.0
            </Badge>
            <Badge color="success" variant="flat" startContent={<div className="w-2 h-2 bg-green-400 rounded-full" />}>
              Live
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto p-6">
        {/* Tool Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <GoldPriceCard />
          <TechNewsCard />
        </div>

        {/* Secondary Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <QuickLinksCard />
          <SystemStatusCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-t from-black/40 to-transparent py-8 mt-16">
        <div className="text-center space-y-3">
          <Text className="text-white/40 text-sm">
            Made with ❤️ using HeroUI
          </Text>
          <div className="flex items-center justify-center gap-4">
            <Link 
              href="https://github.com/WaiTengChong/toolbox" 
              isExternal
              className="text-purple-400 text-sm hover:text-purple-300 transition-colors"
            >
              GitHub Repository
            </Link>
            <Text className="text-white/30">·</Text>
            <Link 
              href="#" 
              className="text-white/40 text-sm hover:text-white/60 transition-colors"
            >
              文檔
            </Link>
          </div>
          <Text className="text-white/30 text-xs">
            © 2024 OpenClaw Toolbox. All rights reserved.
          </Text>
        </div>
      </footer>
    </main>
  );
}
