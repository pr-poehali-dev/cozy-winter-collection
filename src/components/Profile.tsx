import { useState } from "react";
import Icon from "@/components/ui/icon";

interface ProfileField {
  label: string;
  value: string;
  icon?: string;
}

export default function Profile() {
  const [imageUrl] = useState<string>(
    "https://cdn.poehali.dev/files/603d1167-f133-40a9-8e84-e330cf40f5ca.png"
  );

  const basicInfo: ProfileField[] = [
    { label: "имя", value: "Won Bin", icon: "User" },
    { label: "никнейм", value: "원빈이 🐑", icon: "Star" },
    { label: "возраст", value: "21", icon: "Calendar" },
    { label: "день рождения", value: "03.02", icon: "Cake" },
  ];

  const interests: ProfileField[] = [
    { label: "люблю", value: "shaping 🛍️", icon: "Heart" },
    { label: "любимое", value: "Doggy 🐻", icon: "Sparkles" },
    { label: "мечта", value: "super ⭐", icon: "Target" },
    { label: "в голове", value: "let's dance ~~", icon: "Music" },
  ];

  const essentials = ["earrings ✨", "bucket hat 🎩", "cozy vibes 🌙"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-block">
            <div className="flex items-center gap-2 text-primary/40">
              <div className="w-8 h-1 bg-primary/20 rounded-full" />
              <Icon name="Sparkles" size={20} />
              <div className="w-8 h-1 bg-primary/20 rounded-full" />
            </div>
          </div>
          <h1
            className="text-4xl md:text-5xl text-primary mb-2"
            style={{ fontFamily: "Cormorant, serif", fontWeight: 600 }}
          >
            TELL ME 'BOUT IT!
          </h1>
          <p className="text-muted-foreground/60 text-sm tracking-widest">
            ✧ personal profile ✧
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column - Basic Info + Photo */}
          <div className="space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="User" size={18} className="text-primary/60" />
                <h2
                  className="text-xl text-primary"
                  style={{ fontFamily: "Cormorant, serif", fontWeight: 500 }}
                >
                  основная информация
                </h2>
              </div>
              <div className="space-y-4">
                {basicInfo.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-2xl"
                  >
                    {field.icon && (
                      <Icon
                        name={field.icon as any}
                        size={16}
                        className="text-primary/50"
                      />
                    )}
                    <span className="text-sm text-muted-foreground/60 uppercase tracking-wider min-w-[100px]">
                      {field.label}:
                    </span>
                    <span className="text-primary font-light text-lg">
                      {field.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Photo Card */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-primary/10">
              <div className="absolute -top-3 -right-3 bg-primary text-white px-4 py-2 rounded-full text-sm font-light shadow-lg transform rotate-6">
                Hello :)
              </div>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border-8 border-white shadow-xl">
                <img
                  src={imageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary/30"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Interests + Essentials */}
          <div className="space-y-6">
            {/* Interests Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Heart" size={18} className="text-primary/60" />
                <h2
                  className="text-xl text-primary"
                  style={{ fontFamily: "Cormorant, serif", fontWeight: 500 }}
                >
                  интересы
                </h2>
              </div>
              <div className="space-y-4">
                {interests.map((field, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border border-primary/10"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {field.icon && (
                        <Icon
                          name={field.icon as any}
                          size={16}
                          className="text-primary/50"
                        />
                      )}
                      <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                        {field.label}
                      </span>
                    </div>
                    <p className="text-primary text-lg font-light ml-6">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Essentials Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-primary/10">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Sparkles" size={18} className="text-primary/60" />
                <h2
                  className="text-xl text-primary"
                  style={{ fontFamily: "Cormorant, serif", fontWeight: 500 }}
                >
                  мои must-haves
                </h2>
              </div>
              <div className="space-y-3">
                {essentials.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-amber-50/50 rounded-xl"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <span className="text-primary font-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Quote */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-6 border border-primary/20">
              <div className="flex items-start gap-3">
                <Icon
                  name="Quote"
                  size={24}
                  className="text-primary/40 mt-1"
                />
                <div>
                  <p
                    className="text-lg text-primary/80 italic mb-2"
                    style={{ fontFamily: "Cormorant, serif", fontWeight: 400 }}
                  >
                    "каждая мелочь имеет значение, когда она приносит радость"
                  </p>
                  <p className="text-xs text-muted-foreground/50 tracking-wider">
                    — философия azaluk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Decoration */}
        <div className="mt-8 flex justify-center items-center gap-3">
          <div className="w-12 h-px bg-primary/20" />
          <Icon name="Sparkles" size={16} className="text-primary/40" />
          <div className="w-12 h-px bg-primary/20" />
        </div>
      </div>
    </div>
  );
}
