export default function Story() {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-in">
          <h2 className="text-5xl mystical-text">о мире тропинка</h2>
          
          <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
            <p>
              каждая вещь создаётся в маленькой мастерской, где время течёт медленнее. 
              здесь нет спешки — только внимание к деталям и любовь к материалам.
            </p>
            
            <p>
              я верю, что вещи могут хранить тепло рук, которые их создали. 
              что они способны обнимать в холодные дни и напоминать о доме, 
              где бы ты ни был.
            </p>
            
            <p>
              это не просто магазин — это место, где рождаются маленькие истории. 
              и теперь одна из них может стать твоей.
            </p>
          </div>
          
          <div className="pt-8">
            <p className="text-muted-foreground italic">
              с теплом, тропинка
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}