import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function About() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-moss hover:text-moss/70 transition-colors mb-12"
        >
          <Icon name="ArrowLeft" size={20} />
          <span>вернуться в магазин</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-16"
        >
          <div className="text-center space-y-6">
            <h1 className="font-serif text-4xl md:text-5xl text-moss">
              о нас
            </h1>
            <p className="text-lg md:text-xl text-moss/80 leading-relaxed max-w-2xl mx-auto">
              тропинка — это маленький магазин из мира двух подруг, Азалии и Вики.
              <br />
              мы вместе разрабатываем и создаём вещи, в которых живут уют и немного сказки.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="aspect-[3/4] bg-moss/10 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-moss/30">
                  <Icon name="User" size={64} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-moss">Азалия</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed">
                  <p>
                    привет! я Азалия и я ответственна за жизнь магазина и за то, 
                    какие изделия будут в нём продаваться. технические детали и продвижение.
                  </p>
                  <p>
                    я собираю заказы, общаюсь с вами в поддержке, снимаю наши фото и видео, 
                    оформляю сайт и блоги.
                  </p>
                  <p>
                    я веду ютуб и телеграм каналы, в них делюсь своим мировоззрением, 
                    привношу волшебство в повседневность и показываю наши внутренние процессы.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6 md:mt-24"
            >
              <div className="aspect-[3/4] bg-moss/10 rounded-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-moss/30">
                  <Icon name="User" size={64} />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-moss">Вика</h2>
                <div className="space-y-3 text-moss/70 leading-relaxed">
                  <p>
                    это Вика! она — волшебные руки наших тропинок.
                  </p>
                  <p>
                    именно Вика воплощает наши идеи в реальность — в тканях, 
                    нитях и деталях.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center py-12"
          >
            <p className="text-lg text-moss/70 leading-relaxed italic">
              вместе мы делаем вещи, которыми приятно любоваться,
              <br />
              их хочется держать в руках и носить с собой
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
