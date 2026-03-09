import { Product, HeroSlide } from './types';

export const heroSlides: HeroSlide[] = [
  {
    id: 10,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/19f0fad8-f49d-4b2c-a537-7801cf965870.jpeg',
    imageMobile: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/46f0c29d-180e-496d-9ad2-ca82bff91df8.jpeg',
    title: 'МОХОВАЯ КОЛЛЕКЦИЯ',
    subtitle: 'паутинки · ожерелья · кольца',
    buttonText: 'за покупочками!',
    buttonAction: 'catalog'
  },
  {
    id: 5,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/3bf04731-6950-4913-bdd3-0928610b40ac.jpg',
    imageMobile: 'https://cdn.poehali.dev/files/102701bf-703a-4106-a14e-ce09863deb25.jpeg',
    title: 'волшебство, которое можно носить',
    subtitle: 'МАГАЗИНЧИК ВЕЩИЦ РУЧНОЙ РАБОТЫ',
    buttonText: 'посмотреть коллекцию',
    buttonAction: 'catalog',
    floatingQuotes: [
      { text: '✨ это невероятно красиво...', position: 'top-left' },
      { text: '💛 все спрашивают, где заказывала', position: 'bottom-left' },
      { text: '💎 не встречала ничего похожего!', position: 'top-right' }
    ]
  },
  {
    id: 2,
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/8dffdcee-2a11-40b4-a6e1-919850108d3f.jpg',
    imageMobile: 'https://cdn.poehali.dev/files/3a3dfd5f-4b52-42ca-a539-737f72fd1e9b.jpeg',
    title: 'отправь сюрприз близкому ✨',
    subtitle: 'укажи адрес — мы доставим напрямую',
    buttonText: 'посмотреть коллекцию',
    buttonAction: 'catalog'
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'ч е п ч и к 🍷 :: брусника',
    description: 'тёплый чепчик брусничного оттенка',
    price: 3000,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/files/8d4e93bf-b045-43f7-a2b4-f7eba8e95681.jpeg',
    storyDescription: 'этот чепчик — как объятие холодным зимним утром ☕️ связан из пряжи брусничного оттенка, он окутывает теплом и уютом. носить его — словно гулять по рождественской ярмарке и греть руки о стаканчик пряного глинтвейна 🍷✨🎠',
    composition: 'доступен в двух вариантах: лёгкий (50% шерсть, 50% акрил) и утеплённый (мохер, шерсть, акрил, шёлк, люрекс)\nручная стирка в холодной воде\nсушить в горизонтальном положении',
    stock: 5,
    gallery: [
      'https://cdn.poehali.dev/files/8d4e93bf-b045-43f7-a2b4-f7eba8e95681.jpeg',
      'https://cdn.poehali.dev/files/2b8c5eb3-b67c-4e1b-a9a8-21848d2ac746.jpg',
      'https://cdn.poehali.dev/files/0d366c0c-1d81-4cbf-a1ae-8d0c9b0b1a34.jpg',
      'https://cdn.poehali.dev/files/833c0761-23de-43db-8424-faa08fdb0d43.jpg',
      'https://cdn.poehali.dev/files/2ca3539a-c662-4f5f-bb6e-bf404d4ceb14.jpg',
      'https://cdn.poehali.dev/files/055f4541-2c8e-41d3-8c16-5731b8875bb7.jpg',
      'https://cdn.poehali.dev/files/8c0680af-1dfa-4609-8acd-c148c49b6be3.jpg',
      'https://cdn.poehali.dev/files/08111bc9-93aa-433e-9825-f881e336045b.jpg',
      'https://cdn.poehali.dev/files/73df96dd-db76-465f-99c4-445e5ac580fd.jpg'
    ],
    variants: [
      { 
        id: 'light', 
        name: 'лёгкий', 
        price: 3000, 
        description: 'демисезон, для прохладных дней, без мороза',
        composition: '50% шерсть, 50% акрил\nоднослойная вязка средней плотности\nручная стирка в холодной воде\nсушить в горизонтальном положении',
        weight: '80 г'
      },
      { 
        id: 'warm', 
        name: 'утеплённый', 
        price: 3500, 
        description: 'более мягкий и плотный, согреет в морозы',
        composition: 'мохер, шерсть, акрил, шёлк, люрекс\nтолстая тёплая пряжа\nручная стирка в холодной воде\nсушить в горизонтальном положении',
        weight: 'уточняется'
      }
    ]
  },
  {
    id: 2,
    name: 'ч е п ч и к 🤍 :: молочный',
    description: 'мягкий вязаный чепчик из мохера',
    price: 3000,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/files/4ec132db-57cd-4bc3-a373-bbc64944f6cb.jpg',
    storyDescription: 'нежный, как пенка на имбирно-пряничном латте 🤍 этот чепчик создан для тех, кто ценит мягкость и тепло. мы с любовью связали его из молочной пряжи, чтобы он мягко обнимал и шептал вам: "всё будет хорошо" ✨☁️',
    composition: 'доступен в трёх вариантах: лёгкий (50% шерсть, 50% акрил), воздушный (70% мохер, 30% полиамид) и утеплённый (мохер, шерсть, акрил, шёлк, люрекс)\nручная стирка в холодной воде\nсушить в горизонтальном положении',
    stock: 5,
    gallery: [
      'https://cdn.poehali.dev/files/4ec132db-57cd-4bc3-a373-bbc64944f6cb.jpg'
    ],
    variants: [
      { 
        id: 'light', 
        name: 'лёгкий', 
        price: 3000, 
        description: 'демисезон, для прохладных дней, без мороза',
        composition: '50% шерсть, 50% акрил\nоднослойная вязка средней плотности\nручная стирка в холодной воде\nсушить в горизонтальном положении',
        weight: '80 г',
        gallery: [
          'https://cdn.poehali.dev/files/c2e3a29d-2893-4e89-a329-8973ed5202ea.jpg',
          'https://cdn.poehali.dev/files/ed9dc0de-2697-4392-9648-f3bbac34da56.jpg',
          'https://cdn.poehali.dev/files/feb0529b-a88f-4928-a52f-981fef474dd3.jpg',
          'https://cdn.poehali.dev/files/6d0be73d-87f3-42c4-8ca6-f7bb745b4df7.jpg',
          'https://cdn.poehali.dev/files/bd6663ce-1fdb-422f-a0c2-ec478293f74a.jpg'
        ]
      },
      { 
        id: 'airy', 
        name: 'воздушный', 
        price: 3300, 
        description: 'невесомый, но при этом теплый',
        composition: '70% мохер, 30% полиамид\nтончайшая воздушная пряжа\nручная стирка в холодной воде\nсушить в горизонтальном положении',
        weight: '35 г',
        gallery: [
          'https://cdn.poehali.dev/files/aa7924ea-16ce-48e3-bc7e-e283137165e7.jpg',
          'https://cdn.poehali.dev/files/22ae82a5-5ea8-4df0-82b7-f24004122192.jpg',
          'https://cdn.poehali.dev/files/f2cf4d41-258f-4b60-9ac8-9d9bbe05a9db.jpg',
          'https://cdn.poehali.dev/files/2894683c-0403-4f80-9298-ce42bea4fb41.jpg',
          'https://cdn.poehali.dev/files/7b6a21ad-f56e-4e03-9a42-207315477f35.jpg',
          'https://cdn.poehali.dev/files/bd6663ce-1fdb-422f-a0c2-ec478293f74a.jpg'
        ]
      },
      { 
        id: 'warm', 
        name: 'утеплённый', 
        price: 3500, 
        description: 'более мягкий и плотный, согреет в морозы',
        composition: 'мохер, шерсть, акрил, шёлк, люрекс\nтолстая тёплая пряжа\nручная стирка в холодной воде\nсушить в горизонтальном положении',
        weight: '120 г',
        gallery: [
          'https://cdn.poehali.dev/files/2c716feb-82d6-4f8b-93a4-ef4d89c69a23.jpg',
          'https://cdn.poehali.dev/files/c1b610c0-f9e3-4eb2-b23e-3a0a65c662c8.jpg',
          'https://cdn.poehali.dev/files/8dad26b9-7272-4e61-b7c2-1d988bc702cd.jpg',
          'https://cdn.poehali.dev/files/bd6663ce-1fdb-422f-a0c2-ec478293f74a.jpg'
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'п о д в е с 🍄 :: мухомор',
    description: 'функциональный подвес для помады или духов',
    price: 1800,
    category: 'аксессуары',
    image: 'https://cdn.poehali.dev/files/59e4fcf5-58c4-4b13-971c-041b7c1d5e85.jpg',
    storyDescription: 'маленькое лесное чудо, которое не только украшает, но и помогает! 🍄 внутри помещается помада, духи или любая мелочь около-цилиндрической формы. крепится к сумочке, ремешку или связке ключей — и нужная вещица всегда под рукой, не нужно рыться в сумке! красиво и удобно одновременно ✨💄 💅🏻',
    composition: 'доступен в двух вариантах: с расшивкой бисером и классический\nручная работа\nбережное обращение',
    stock: 3,
    variants: [
      { 
        id: 'embroidered', 
        name: 'с расшивкой', 
        price: 1800, 
        description: 'с декоративными элементами ручной вышивки бисером',
        gallery: [
          'https://cdn.poehali.dev/files/2c6548e3-c200-44f5-b17f-560c5ef9c0b8.jpg',
          'https://cdn.poehali.dev/files/a8d56f20-17a8-407d-b42a-3b2e9923b8e9.jpg',
          'https://cdn.poehali.dev/files/833b567d-12d0-4596-9844-60bce21cfa52.jpg',
          'https://cdn.poehali.dev/files/a2aaefa3-591c-495b-babe-cffc3c4e69d4.jpg',
          'https://cdn.poehali.dev/files/26a4ccc7-3cae-4fe9-b872-e669c39cd005.jpg',
          'https://cdn.poehali.dev/files/0f6b47b4-47ed-44b3-a16c-b437d4d3746a.jpg'
        ]
      },
      { 
        id: 'simple', 
        name: 'классический', 
        price: 1600, 
        description: 'уютный минималистичный вариант',
        gallery: [
          'https://cdn.poehali.dev/files/a57dfc87-237b-49bd-ab07-26e035d47fe8.jpg',
          'https://cdn.poehali.dev/files/773fe20c-cdca-4437-a0b8-3afe744d19a1.jpg',
          'https://cdn.poehali.dev/files/0f6b47b4-47ed-44b3-a16c-b437d4d3746a.jpg'
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'п о д в е с 🌑 :: сладкая тьма',
    description: 'таинственный грибочек с блёстками красного вина',
    price: 1800,
    category: 'аксессуары',
    image: 'https://cdn.poehali.dev/files/b1209a34-4f59-4ad2-be9b-5fae95e5d682.jpg',
    storyDescription: 'загадочный грибочек из тёмного леса 🌑 ручная расшивка блёстками цвета красного вина создаёт мерцающий эффект — словно звёздная пыль на бархатной ночи. внутри помещается помада, духи или любая мелочь около-цилиндрической формы. крепится к сумочке, ремешку или связке ключей — магия всегда с тобой 🖤✨💫',
    composition: 'доступен в двух вариантах: с расшивкой блёстками и классический\nручная работа\nбережное обращение',
    stock: 3,
    variants: [
      { 
        id: 'embroidered', 
        name: 'с расшивкой', 
        price: 1800, 
        description: 'с декоративными элементами ручной вышивки блёстками',
        gallery: [
          'https://cdn.poehali.dev/files/1aee7db5-70b4-4cf7-a414-eaecbf26952b.jpg',
          'https://cdn.poehali.dev/files/33d7e3d2-a87f-455b-9e58-691957bba1de.jpg',
          'https://cdn.poehali.dev/files/f3b2d06b-5d73-471d-bcb3-46f06977be63.jpg',
          'https://cdn.poehali.dev/files/a26a1719-7eb3-44a0-b383-e9fed8563add.jpg',
          'https://cdn.poehali.dev/files/7a3313b7-8c6a-4753-944a-27237da4eeda.jpg',
          'https://cdn.poehali.dev/files/096a230c-7ce7-46c7-9fb0-4dad451f038b.jpg',
          'https://cdn.poehali.dev/files/6d281d98-acd7-44a2-b61d-6931bcecaa13.jpg',
          'https://cdn.poehali.dev/files/ac9b8533-00aa-43b5-b888-0463ea4fe2e9.jpg'
        ]
      },
      { 
        id: 'simple', 
        name: 'классический', 
        price: 1600, 
        description: 'уютный минималистичный вариант',
        gallery: [
          'https://cdn.poehali.dev/files/fe6a7972-2021-46ea-9c7a-9e2f3ba20d7b.jpg',
          'https://cdn.poehali.dev/files/97e7d0ef-cccd-4ca8-8945-f022ae5867a7.jpg'
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'п а у т и н к а 🤍🕸️ :: молочная',
    description: 'воздушный свитер-паутинка из мохера и шёлка',
    price: 7000,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/files/f9900306-b261-49b1-8c22-4cd244265837.jpg',
    storyDescription: 'невесомый, как облако, нежный, как утренний туман 🤍 этот свитер-паутинка соткан из мохера и шёлка, каждая петелька дышит и обнимает. кажется воздушным и прозрачным, но удивительно тёплый — словно тебя окутали облаком, которое согревает даже в морозный день. он для тех, кто ценит волшебство лёгкости и тепла одновременно ✨☁️',
    composition: '55% мохер, 15% меринос, 30% нейлон\nручная стирка в холодной воде\nсушить в горизонтальном положении',
    sizing: 'каждая паутинка изготавливается вручную по вашим меркам. при оформлении заказа просто укажите примерный обхват груди в комментарии — адаптируем изделие под вас. срок изготовления и отправки — 7 дней 💌\n\nмерки на фото:\n• обхват груди модели: 80 см\n• обхват туловища паутинки: 94 см\n• длина паутинки: 37 см кроп / 50 см полноразмерная\n• обхват конца рукавов: 40 см\n• размер: S-M',
    stock: 5,
    gallery: [
      'https://cdn.poehali.dev/files/f9900306-b261-49b1-8c22-4cd244265837.jpg',
      'https://cdn.poehali.dev/files/47ca964b-cb26-49b8-9411-b7635cf02832.jpg',
      'https://cdn.poehali.dev/files/c7ab2409-f2f1-4a3e-a69a-98f82d77309f.jpg',
      'https://cdn.poehali.dev/files/2b4dedb9-cb70-4178-adb0-e974307f0285.jpg',
      'https://cdn.poehali.dev/files/b5ea2111-f20b-4390-bef2-2f5281e13fa6.jpg'
    ],
    variants: [
      { 
        id: 'crop', 
        name: 'кроп на талии', 
        price: 7000, 
        description: 'укороченный вариант, подчёркивает силуэт',
        composition: '55% мохер, 15% меринос, 30% нейлон\nручная стирка в холодной воде\nсушить в горизонтальном положении',
        weight: '100 г',
        sizing: 'изготавливается по индивидуальным меркам. стандартный размер — обхват груди 80-92 см. нужен другой? просто напиши нам 💌\n\nмерки на фото:\n• обхват груди модели: 80 см\n• обхват туловища свитера: 94 см\n• обхват рукавов: 40 см\n• размер: S-M (оверсайз)',
        gallery: [
          'https://cdn.poehali.dev/files/0402bbc8-3534-4bc6-968e-4ea3bd3516bc.jpg',
          'https://cdn.poehali.dev/files/9c6a3802-9de0-4c41-abdd-596aeed48236.jpg',
          'https://cdn.poehali.dev/files/47ca964b-cb26-49b8-9411-b7635cf02832.jpg',
          'https://cdn.poehali.dev/files/c7ab2409-f2f1-4a3e-a69a-98f82d77309f.jpg',
          'https://cdn.poehali.dev/files/2b4dedb9-cb70-4178-adb0-e974307f0285.jpg',
          'https://cdn.poehali.dev/files/b5ea2111-f20b-4390-bef2-2f5281e13fa6.jpg'
        ]
      },
      { 
        id: 'full', 
        name: 'полноразмерный до таза', 
        price: 8000, 
        description: 'классическая длина для максимального комфорта',
        composition: '55% мохер, 15% меринос, 30% нейлон\nручная стирка в холодной воде\nсушить в горизонтальном положении',
        weight: '130 г',
        sizing: 'изготавливается по индивидуальным меркам. стандартный размер — обхват груди 80-92 см. нужен другой? просто напиши нам 💌\n\nмерки на фото:\n• обхват груди модели: 80 см\n• обхват туловища свитера: 94 см\n• обхват рукавов: 40 см\n• размер: S-M (оверсайз)',
        gallery: [
          'https://cdn.poehali.dev/files/f9900306-b261-49b1-8c22-4cd244265837.jpg',
          'https://cdn.poehali.dev/files/f7ab3103-6c8e-40be-9ff4-981be22aa3d0.jpg',
          'https://cdn.poehali.dev/files/90ae7a2d-7845-4365-826d-3e173fbf2cea.jpg',
          'https://cdn.poehali.dev/files/47ca964b-cb26-49b8-9411-b7635cf02832.jpg',
          'https://cdn.poehali.dev/files/c7ab2409-f2f1-4a3e-a69a-98f82d77309f.jpg',
          'https://cdn.poehali.dev/files/2b4dedb9-cb70-4178-adb0-e974307f0285.jpg',
          'https://cdn.poehali.dev/files/b5ea2111-f20b-4390-bef2-2f5281e13fa6.jpg'
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'г и р л я н д а 🏹 :: красные флажки',
    description: 'бумажная гирлянда с треугольными флажками',
    price: 450,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/files/ac09b638-81c4-400e-8704-6e2e5b3c96cd.jpg',
    storyDescription: 'лёгкая воздушная гирлянда из красной бумаги 🧶 флажки создают праздничное настроение и добавляют уюта любому пространству. идеальна для украшения комнаты, фотозоны или праздника 🍵',
    composition: 'длина: 2 метра\nбумага плотная, крафтовая\nручная работа',
    stock: 10,
    gallery: [
      'https://cdn.poehali.dev/files/ac09b638-81c4-400e-8704-6e2e5b3c96cd.jpg',
      'https://cdn.poehali.dev/files/7905e08b-5abf-47d9-92a6-fd45bf08f45c.jpg',
      'https://cdn.poehali.dev/files/fc95c5e5-6c9a-4281-9a39-e9a642920769.jpg',
      'https://cdn.poehali.dev/files/69416a27-a379-4a16-8d57-60207861a8ec.jpg'
    ]
  },
  {
    id: 6,
    name: 'б л ю д ц е ⭐ :: хрупкая красота',
    description: 'декоративное блюдце ручной работы',
    price: 1500,
    category: 'для дома',
    image: 'https://cdn.poehali.dev/files/1215fc8d-4530-4f4f-8b6a-46cf0489a809.jpg',
    storyDescription: 'нежное блюдце, созданное вручную ⭐ каждое уникально, с авторской росписью. идеально для украшений или как самостоятельный элемент декора. осталось всего 2 штуки, повторов не планируется 💫',
    composition: 'диаметр: 5-6 см\nручная работа\nлюбят бережное обращение',
    badge: 'limited',
    stock: 2,
    videoUrl: 'https://youtu.be/qdCRV1GF898',
    videoTitle: 'о хрупкой красоте',
    gallery: [
      'https://cdn.poehali.dev/files/1215fc8d-4530-4f4f-8b6a-46cf0489a809.jpg',
      'https://cdn.poehali.dev/files/f2195380-bf93-41cf-9947-8de6ba10119c.jpg',
      'https://cdn.poehali.dev/files/852a81f2-359b-4de0-895e-2ff18dc66df1.jpg',
      'https://cdn.poehali.dev/files/1a9f723e-68d6-489f-b402-f346dc70a2c6.jpg',
      'https://cdn.poehali.dev/files/4d28d0ed-de13-4574-8ea5-26387a981d2f.jpg',
      'https://cdn.poehali.dev/files/6c142501-82e6-44cd-8291-45c5ef8add5f.jpg'
    ]
  },
  {
    id: 7,
    name: 'п а у т и н к а 🌿 :: моховой лес',
    description: 'свитер-паутинка в цвете мха (скоро в продаже)',
    price: 0,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/files/25ec96e7-20b2-452a-98d4-0b2c82b8b147.jpg',
    storyDescription: 'пыльно-зелёный, как мох на старых камнях на пути в домик хоббита! 🧝🏼‍♀️🌿 этот свитер-паутинка напомнит о лесных прогулках и тишине. второе фото — волшебный салат из тестовых образцов будущих свитеров 🧵✨ скоро появится в магазине!',
    composition: '75% мохер, 25% шёлк\nручная стирка в холодной воде\nсушить в горизонтальном положении',
    badge: 'soon',
    stock: 5,
    gallery: [
      'https://cdn.poehali.dev/files/25ec96e7-20b2-452a-98d4-0b2c82b8b147.jpg',
      'https://cdn.poehali.dev/files/a29583c6-557a-4031-9830-bf989cf21377.jpeg'
    ]
  },
  {
    id: 8,
    name: 'п а у т и н к а 🍷 :: бордовый закат',
    description: 'свитер-паутинка бордового цвета (скоро в продаже)',
    price: 0,
    category: 'для зимней прогулки',
    image: 'https://cdn.poehali.dev/files/65112f57-0812-40c7-a01b-0788539bae2c.jpg',
    storyDescription: 'глубокий бордовый, как закатное небо 🍷 этот свитер-паутинка согреет и добавит красок в серые дни. второе фото — волшебный салат из тестовых образцов будущих свитеров 🧵✨ скоро появится в магазине!',
    composition: '75% мохер, 25% шёлк\nручная стирка в холодной воде\nсушить в горизонтальном положении',
    badge: 'soon',
    stock: 5,
    gallery: [
      'https://cdn.poehali.dev/files/65112f57-0812-40c7-a01b-0788539bae2c.jpg',
      'https://cdn.poehali.dev/files/a29583c6-557a-4031-9830-bf989cf21377.jpeg'
    ]
  },
  {
    id: 10,
    name: 'к о л е ч к и ⊹🌿˚. моховые',
    description: 'моховый агат, унакитовая яшма, золотые вкрапления гематита',
    price: 500,
    category: 'аксессуары',
    image: 'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/624e16ad-c6d1-4caa-b4e7-a6331f6e1f53.jpeg',
    storyDescription: 'натуральный моховый агат. унакитовая яшма, золотые вкрапления гематита. тёплые, лесные, живые — будто носишь кусочек леса с собой. каждое кольцо чуть отличается от другого: у камня свой рисунок, свои прожилки. минималистичное, на каждый день. практически не ощущается на пальцах и очень прочное.',
    composition: 'материалы: моховый агат, унакитовая яшма, гематит, леска\nразмер: укажите желаемый диаметр кольца при заказе в миллиметрах. на фото — примерно 17-18мм',
    stock: 10,
    gallery: [
      'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/624e16ad-c6d1-4caa-b4e7-a6331f6e1f53.jpeg',
      'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/b6528067-d3dd-44bb-9f09-b712151877d1.jpeg',
      'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/79741e6c-4084-46ff-a794-1d9bc1ccee5d.jpeg',
      'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/443c9fb8-3f7f-459b-a2cf-1749c6defb6a.jpeg',
      'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/95c2f8a3-8f00-4e0c-9057-509a31215c0b.jpeg',
      'https://cdn.poehali.dev/projects/a129e1cc-3cd9-4834-888d-cf7eed2f1b72/bucket/139323ee-7032-480a-b9b6-293c27a52bf4.jpeg'
    ]
  }
];