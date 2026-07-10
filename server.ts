import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Google GenAI securely
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "dummy-key-for-compilation",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Endpoints go here
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format" });
      }

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          text: "مرحباً بك! أنا الشيف سمعان، صانع الحلويات الافتراضي للبوتيك الفاخر 'تيراميسو سعف و رمال'. يرجى تهيئة مفتاح الذكاء الاصطناعي في لوحة أسرار الإعدادات لنبدأ التحدث الفوري بنظام الذكاء الاصطناعي. حالياً، تسرني خدمتك وإخبارك بأن حلوياتنا تُصنع يدوياً بكل حب وشغف يومياً!"
        });
      }

      const contents = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const systemPrompt = `You are 'Chef Samaan' (الشيف سمعان), the highly esteemed virtual master pastry chef at the luxurious boutique bakery 'تيراميسو_سعف و رمال' (Tiramisu Sa'af & Ramal).
      Your personality is refined, highly hospitable, passionate, and elegant. You speak fluidly in Arabic and English, mirroring the customer's choice of language.
      You help customers navigate our luxury dessert collections: Classic Venice Tiramisu, Sicilian Pistachio & Cardamom Tiramisu, Red Velvet, Birthday Cakes, Coffee combinations, and Signature Gift boxes.
      You always emphasize our baking philosophy:
      - Premium natural ingredients (e.g., Italian Mascarpone, single-origin Venezuelan cocoa, fresh organic berries).
      - Handcrafted daily with ultimate love and passion.
      - Elegant presentation reminiscent of premium European gourmet boutiques.
      Be extremely welcoming, helpful, and charming. Keep your responses gourmet-focused, elegant, and concise (under 130 words). Never output technical terminology.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate chat response" });
    }
  });

  app.post("/api/recommendations", async (req, res) => {
    try {
      const { sweetLevel, flavorProfile, eventType } = req.body;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Return elegant simulated fallback
        return res.json({
          personalizedGreetingEn: "Welcome to our boutique! Here is a custom luxury pairing crafted specially for your gourmet preferences.",
          personalizedGreetingAr: "مرحباً بك في البوتيك الفاخر! إليك ثنائية حلويات ملكية تم تنسيقها بعناية لتناسب ذوقك الاستثنائي.",
          recommendedProducts: [
            { productId: "classic-tiramisu", reasonEn: "Our legendary Venetian masterpiece perfectly captures your desire for balanced sweetness and rich espresso flavors.", reasonAr: "تحفتنا الفنية الكلاسيكية التي تلبي رغبتك في حلاوة متوازنة ونكهة إسبريسو غنية ومثالية." },
            { productId: "dessert-box", reasonEn: "An absolute premium package featuring our finest creations, ideal for premium hosting or royal gifting.", reasonAr: "باقة النخبة الفاخرة التي تجمع أرقى ابتكاراتنا، وهي الخيار المثالي للضيافة الراقية أو الإهداء السخي." }
          ],
          bakerTipEn: "Chef Samaan recommends serving these creations at room temperature alongside a delicate pour-over V60 coffee to unleash the full depth of the cocoa.",
          bakerTipAr: "ينصحك الشيف سمعان بتقديم هذه المبتكرات بدرجة حرارة الغرفة الخفيفة مع قهوة V60 مقطرة دافئة لإطلاق النطاق الكامل لإيحاءات الكاكاو الإيطالي الفاخر."
        });
      }

      const prompt = `Based on the following customer preferences:
      - Sweetness Level: ${sweetLevel || 'balanced'}
      - Flavor Profile: ${flavorProfile || 'coffee'}
      - Occasion/Event Type: ${eventType || 'personal'}

      Recommend exactly 2 products from our luxury bakery menu.
      The available menu product IDs are:
      - 'classic-tiramisu' (Classic Venetian Tiramisu, strong coffee & cocoa, balanced sweet)
      - 'pistachio-tiramisu' (Pistachio & Cardamom Tiramisu, nutty, aromatic, balanced sweet)
      - 'lotus-tiramisu' (Lotus cookie flavor, sweet, biscuit butter crunch)
      - 'chocolate-tiramisu' (Dark chocolate ganache, rich, intense dark, mildly sweet)
      - 'birthday-cake' (Royal celebration vanilla cake with gold leaves, sweet, celebration event)
      - 'red-velvet-cake' (Majestic cocoa sponge with white chocolate frosting, sweet, celebration)
      - 'strawberry-cheesecake' (Creamy baked cheesecake with strawberry glaze, fruity & sweet)
      - 'chocolate-brownies' (Moist sea salt brownies fudge, chocolatey, rich)
      - 'mini-cupcakes' (Selection box, sweet, perfect for gifting/parties)
      - 'cookies-box' (Crispy pecan & chocolate cookies, balanced sweet)
      - 'dessert-box' (Ultimate gift assortment with tiramisu & cookies, perfect for luxury gifting)
      - 'coffee-combo' (Venetian Tiramisu + specialty Ethiopian V60 coffee, perfect coffee pairing)

      Choose the 2 most suitable product IDs. Fill in the JSON response structure according to the requested schema. Provide custom personalized greetings and match descriptions in both English and Arabic.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              personalizedGreetingEn: { type: Type.STRING },
              personalizedGreetingAr: { type: Type.STRING },
              recommendedProducts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productId: { type: Type.STRING },
                    reasonEn: { type: Type.STRING },
                    reasonAr: { type: Type.STRING }
                  },
                  required: ["productId", "reasonEn", "reasonAr"]
                }
              },
              bakerTipEn: { type: Type.STRING },
              bakerTipAr: { type: Type.STRING }
            },
            required: ["personalizedGreetingEn", "personalizedGreetingAr", "recommendedProducts", "bakerTipEn", "bakerTipAr"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (error: any) {
      console.error("Recommendations API error:", error);
      res.status(500).json({ error: error.message || "Failed to generate recommendations" });
    }
  });

  // Serve static client assets
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
