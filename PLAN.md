# План реализации — ТД Ангара

## Контекст

Текущий сайт работает на Яндекс.Бизнес — это шаблонный конструктор без каталога, корзины и админки.
Нужно разработать полноценный сайт с нуля.

Товарная линейка: рейка, брусок, вагонка, имитация бруса, планкен, террасная доска.
Контакты: Красноярск, ул. Маерчака, 109М. Тел: +7 (953) 585-05-09.

---

## Стек технологий

| Слой | Технология | Обоснование |
|------|-----------|-------------|
| Framework | Next.js 14 (App Router) | SSR для SEO, API routes, единая кодовая база |
| Язык | TypeScript | Типобезопасность, меньше ошибок |
| Стили | Tailwind CSS | Быстрая верстка, адаптивность из коробки |
| База данных | PostgreSQL | Реляционные данные, надежность |
| ORM | Prisma | Типизированные запросы, миграции |
| Авторизация | NextAuth.js (Credentials) | Простая защита админки |
| Хранение фото | Локально (public/uploads) → S3/R2 при деплое | Простота на MVP |
| Деплой | Railway / Vercel + Railway DB | Быстрый старт |

---

## Дизайн-система

### Айдентика
- **Стиль**: современный индустриально-природный — дерево + металл
- **Цветовая палитра**:
  - Основной: `#1C2B1A` (тёмно-зелёный, цвет леса)
  - Акцент: `#C8893A` (янтарный, цвет сосны)
  - Фон: `#F5F2EE` (кремовый, цвет необработанного дерева)
  - Текст: `#1A1A1A`
  - Второстепенный текст: `#6B6B6B`
- **Типографика**: Inter (основной) + локальный шрифт для заголовков
- **Иконки**: Lucide React

### Структура публичного сайта
```
/                    — главная (hero + преимущества + каталог превью + CTA)
/catalog             — полный каталог с фильтрами
/catalog/[id]        — карточка товара
/cart                — корзина + форма заявки
/about               — о компании
/contacts            — контакты + карта
```

### Структура админки
```
/admin               — редирект на /admin/dashboard
/admin/login         — авторизация
/admin/dashboard     — статистика (кол-во заявок, новые)
/admin/products      — список товаров
/admin/products/new  — создание товара
/admin/products/[id] — редактирование товара
/admin/orders        — список заявок
/admin/orders/[id]   — карточка заявки
```

---

## Схема базы данных

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Decimal
  unit        String           // шт, м², м³, пог.м, пачка
  stock       Decimal          // наличие
  step        Decimal @default(1) // шаг дробления
  images      String[]         // пути к файлам
  isActive    Boolean @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  orderItems  OrderItem[]
}

model Order {
  id          String      @id @default(cuid())
  number      Int         @unique @default(autoincrement())
  clientName  String
  clientPhone String
  comment     String?
  status      OrderStatus @default(NEW)
  totalAmount Decimal
  items       OrderItem[]
  history     OrderHistory[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model OrderItem {
  id        String  @id @default(cuid())
  order     Order   @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product @relation(fields: [productId], references: [id])
  productId String
  name      String  // snapshot названия
  price     Decimal // snapshot цены
  unit      String  // snapshot единицы
  quantity  Decimal
  total     Decimal
}

model OrderHistory {
  id        String   @id @default(cuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  event     String   // "Заявка создана" / "Статус изменён: Новая → В обработке"
  createdAt DateTime @default(now())
}

enum OrderStatus {
  NEW
  IN_PROGRESS
  DONE
  CANCELLED
}
```

---

## API Routes

### Публичные
```
GET  /api/products          — список активных товаров
GET  /api/products/[id]     — один товар
POST /api/orders            — создать заявку из корзины
```

### Защищённые (сессия)
```
GET    /api/admin/products          — все товары (вкл. неактивные)
POST   /api/admin/products          — создать товар
PUT    /api/admin/products/[id]     — обновить товар
DELETE /api/admin/products/[id]     — удалить товар
POST   /api/admin/products/[id]/upload — загрузить фото

GET  /api/admin/orders              — список заявок
GET  /api/admin/orders/[id]         — одна заявка
PUT  /api/admin/orders/[id]/status  — сменить статус
```

---

## Фазы разработки

### Фаза 0 — Инициализация (0.5 дня)
- [ ] `npx create-next-app@latest` с TypeScript, Tailwind, App Router
- [ ] Настройка Prisma + PostgreSQL
- [ ] Настройка NextAuth.js (Credentials provider)
- [ ] Создание `.env` с переменными окружения
- [ ] Первая миграция БД
- [ ] Базовый layout (шапка, футер)
- [ ] Дизайн-токены в Tailwind config

### Фаза 1 — API и модели (1 день)
- [ ] Prisma-схема (Product, Order, OrderItem, OrderHistory)
- [ ] Сид-скрипт с тестовыми данными (6 товаров)
- [ ] API: GET /api/products
- [ ] API: GET /api/products/[id]
- [ ] API: POST /api/orders (создание заявки + запись истории)
- [ ] API: /api/admin/products (CRUD)
- [ ] API: /api/admin/orders (list + status update)
- [ ] API: /api/admin/products/[id]/upload (multer / formidable)
- [ ] Middleware защиты роутов /admin/*

### Фаза 2 — Публичный сайт (2 дня)
- [ ] Главная страница:
  - Hero-секция (фото склада, слоган, CTA)
  - Блок "Почему мы" (4 преимущества)
  - Превью каталога (6 карточек)
  - Секция контактов
- [ ] Каталог /catalog:
  - Сетка карточек товаров
  - Поиск по названию
  - Сортировка (цена, название)
- [ ] Карточка товара /catalog/[id]:
  - Галерея фотографий
  - Название, описание, цена, единица
  - Наличие
  - Поле количества с валидацией шага
  - Кнопка "Добавить в корзину"
- [ ] Страницы "О нас" и "Контакты" (адрес, телефон, карта Яндекс)

### Фаза 3 — Корзина и заявка (1 день)
- [ ] Состояние корзины через Zustand (persist в localStorage)
- [ ] Страница корзины /cart:
  - Список товаров с фото
  - Изменение количества (с шагом)
  - Удаление позиции
  - Расчёт суммы по каждой позиции
  - Итоговая сумма
- [ ] Форма оформления заявки:
  - Поля: имя, телефон, комментарий
  - Валидация (телефон — маска)
  - POST /api/orders
  - Страница успешной отправки

### Фаза 4 — Админка: Товары (1.5 дня)
- [ ] Страница /admin/login (форма + NextAuth signIn)
- [ ] Layout админки (sidebar с двумя разделами)
- [ ] Дашборд: счётчики новых заявок, всего заявок, товаров
- [ ] /admin/products — таблица товаров:
  - Колонки: фото, название, цена, единица, наличие, статус, действия
  - Кнопка "Добавить товар"
  - Быстрое переключение isActive
- [ ] /admin/products/new и /admin/products/[id]:
  - Форма со всеми полями товара
  - Загрузка нескольких фото (drag & drop)
  - Предпросмотр загруженных фото
  - Удаление отдельных фото
  - Выбор единицы измерения (свободный ввод)
  - Поле шага с подсказкой

### Фаза 5 — Админка: Заявки (1 день)
- [ ] /admin/orders — таблица заявок:
  - Колонки: №, дата, клиент, телефон, сумма, статус
  - Фильтр по статусу
  - Бейдж "Новая" (выделение)
  - Пагинация
- [ ] /admin/orders/[id] — карточка заявки:
  - Данные клиента
  - Таблица товаров (snapshot цены/названия)
  - Итоговая сумма
  - Смена статуса (select с 4 вариантами)
  - Блок истории изменений (timeline)

### Фаза 6 — Полировка и адаптив (1 день)
- [ ] Мобильное меню (бургер)
- [ ] Адаптив всех страниц (320px–1440px)
- [ ] Loading-скелетоны для каталога
- [ ] Toast-уведомления (добавлено в корзину, заявка отправлена)
- [ ] Иконка корзины в шапке с количеством товаров
- [ ] 404 и 500 страницы
- [ ] SEO: meta title/description для публичных страниц
- [ ] Favicon и og:image

### Фаза 7 — Тестирование и деплой (1 день)
- [ ] Unit-тесты: валидация шага дробления, расчёт суммы корзины
- [ ] Integration-тесты: API создания заявки, CRUD товаров
- [ ] Проверка на реальных мобильных устройствах
- [ ] Настройка Railway (PostgreSQL + Next.js)
- [ ] Переменные окружения в production
- [ ] Настройка хранилища для фото (S3 или Railway Volume)
- [ ] Smoke-тест после деплоя

---

## Ключевые решения

### Корзина без авторизации
Состояние корзины хранится в localStorage через Zustand persist.
При оформлении — данные уходят на сервер, корзина очищается.

### Snapshot цены в заявке
При создании заявки цена, название и единица измерения копируются в `OrderItem`.
Это позволяет менять товары в каталоге, не ломая историю заявок.

### Валидация шага дробления
```ts
function isValidQuantity(value: number, step: number): boolean {
  return Math.round(value / step) === value / step;
}
```
Применяется и на клиенте (UI), и на сервере (API).

### Загрузка фото
На MVP — файлы сохраняются в `public/uploads/`.
URL хранится в `images[]` в БД.
При деплое — замена на S3/Cloudflare R2 без изменения API.

---

## Оценка времени

| Фаза | Описание | Дни |
|------|---------|-----|
| 0 | Инициализация | 0.5 |
| 1 | API и модели | 1.0 |
| 2 | Публичный сайт | 2.0 |
| 3 | Корзина и заявка | 1.0 |
| 4 | Админка: Товары | 1.5 |
| 5 | Админка: Заявки | 1.0 |
| 6 | Полировка | 1.0 |
| 7 | Тесты и деплой | 1.0 |
| **Итого** | | **9 дней** |

---

## Переменные окружения

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://td-angara.ru
NEXTAUTH_SECRET=...
ADMIN_EMAIL=admin@td-angara.ru
ADMIN_PASSWORD=...        # хранится как bcrypt hash
UPLOAD_DIR=./public/uploads
```
