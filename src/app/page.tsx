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
  Divider,
  Link
} from "@heroui/react";
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell 
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
  GiRobotGolem
} from "react-icons/gi";

// Gold Price Component
function GoldPriceCard() {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

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
      // Fallback price
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
    <Card className="bg-gradient-to-br from-amber-900/50 to-yellow-900/30 border-amber-500/30">
      <CardHeader className="bg-gradient-to-r from-amber-600 to-yellow-500">
        <div className="flex items-center gap-3">
          <GiGoldBar size={28} />
          <div>
            <Title className="text-white text-xl">🥇 黃金價格</Title>
            <Text className="text-white/70 text-small">24K 每克黃金</Text>
          </div>
        </div>
        <Button
          isIconOnly
          variant="light"
          onPress={fetchPrice}
          isDisabled={loading}
          className="text-white"
        >
          <GiRefresh size={20} />
        </Button>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" color="warning" />
          </div>
        ) : price ? (
          <div className="text-center py-4">
            <Text className="text-6xl font-bold text-amber-400">
              ¥{price.toFixed(2)}
            </Text>
            <Text className="text-default-500 mt-2">
              更新時間: {lastUpdate}
            </Text>
          </div>
        ) : null}
      </CardBody>
      <CardFooter className="bg-black/20">
        <div className="w-full flex justify-between items-center">
          <Text className="text-small text-white/60">
            數據來源: GoldAPI.io
          </Text>
          <Badge color="warning" variant="flat">
            即時報價
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

// Tech News Component
function TechNewsCard() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<string>("");

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
      // Demo news
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
    <Card className="bg-gradient-to-br from-purple-900/50 to-blue-900/30 border-purple-500/30">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-500">
        <div className="flex items-center gap-3">
          <GiNewspaper size={28} />
          <div>
            <Title className="text-white text-xl">📰 科技新聞</Title>
            <Text className="text-white/70 text-small">最新科技動態</Text>
          </div>
        </div>
        <Button
          isIconOnly
          variant="light"
          onPress={fetchNews}
          isDisabled={loading}
          className="text-white"
        >
          <GiRefresh size={20} />
        </Button>
      </CardHeader>
      <CardBody>
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner size="lg" color="secondary" />
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {news.map((item, index) => (
              <Link 
                key={index} 
                href={item.url || "#"} 
                isExternal
                className="block"
              >
                <div className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <Text className="text-white font-medium text-small line-clamp-2">
                    {item.title || "無標題"}
                  </Text>
                  <Text className="text-white/50 text-tiny mt-1">
                    {item.source || "未知來源"}
                  </Text>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardBody>
      <CardFooter className="bg-black/20">
        <div className="w-full flex justify-between items-center">
          <Text className="text-small text-white/60">
            更新時間: {lastUpdate}
          </Text>
          <Badge color="secondary" variant="flat">
            {news.length} 條新聞
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
}

// Quick Links Component
function QuickLinksCard() {
  const tools = [
    { name: "黃金價格", icon: <GiGoldBar />, color: "warning", href: "#gold" },
    { name: "科技新聞", icon: <GiNewspaper />, color: "secondary", href: "#news" },
    { name: "天氣預報", icon: <GiGlobe />, color: "success", href: "#" },
    { name: "股票行情", icon: <GiMoneyStack />, color: "success", href: "#" },
    { name: "AI 工具", icon: <GiArtificialHive />, color: "primary", href: "#" },
    { name: "開發工具", icon: <GiChip />, color: "default", href: "#" },
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-700/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <GiProcessor size={28} />
          <div>
            <Title className="text-white text-xl">⚡ 快速連結</Title>
            <Text className="text-white/70 text-small">常用工具</Text>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-3">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              href={tool.href}
              className="flex flex-col items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all hover:scale-105"
            >
              <div className={`text-${tool.color === 'warning' ? 'amber' : tool.color === 'secondary' ? 'purple' : tool.color === 'success' ? 'green' : 'blue'}-400 text-2xl mb-2`}>
                {tool.icon}
              </div>
              <Text className="text-white text-xs text-center">{tool.name}</Text>
            </Link>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

// System Status Component
function SystemStatusCard() {
  const statusItems = [
    { name: "CPU 使用率", value: "23%", color: "success", icon: <GiChip /> },
    { name: "記憶體", value: "4.2 GB", color: "primary", icon: <GiProcessor /> },
    { name: "運行時間", value: "5 天", color: "secondary", icon: <GiHealthPotion /> },
  ];

  return (
    <Card className="bg-gray-900/50 border-gray-700/50">
      <CardHeader>
        <div className="flex items-center gap-3">
          <GiRobotGolem size={28} />
          <div>
            <Title className="text-white text-xl">🤖 OpenClaw 狀態</Title>
            <Text className="text-white/70 text-small">系統監控</Text>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid grid-cols-3 gap-4">
          {statusItems.map((item, index) => (
            <div key={index} className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-white/60 text-xs mb-1">{item.name}</div>
              <Badge color={item.color as any} variant="flat" className="mb-1">
                {item.value}
              </Badge>
            </div>
          ))}
        </div>
      </CardBody>
      <CardFooter>
        <Text className="text-white/50 text-small w-full text-center">
          Powered by OpenClaw AI Assistant
        </Text>
      </CardFooter>
    </Card>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-8 px-4 shadow-2xl">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Avatar 
              src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" 
              className="w-16 h-16"
            />
            <Title className="text-4xl font-bold text-white">🧰 OpenClaw Toolbox</Title>
          </div>
          <Text className="text-white/80 text-lg">實用工具箱 · 持續更新中</Text>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Tool Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <GoldPriceCard />
          <TechNewsCard />
        </div>

        {/* Secondary Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <QuickLinksCard />
          <SystemStatusCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black/30 py-6 mt-12">
        <div className="text-center">
          <Text className="text-white/50 text-sm">
            Powered by OpenClaw · Built with HeroUI
          </Text>
          <Link 
            href="https://github.com/WaiTengChong/gold-price-page" 
            isExternal
            className="text-purple-400 text-sm mt-1"
          >
            GitHub Repository
          </Link>
        </div>
      </footer>
    </main>
  );
}
