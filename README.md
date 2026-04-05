# 🚀 ThoughtForge — Multi-User Developer Blog Platform

> *Where ideas aren’t just written — they’re challenged, voted on, and evolved.*

---

## 🧠 Overview

**ThoughtForge** is a next-generation **multi-user blogging platform** designed for developers, engineers, and thinkers.

Unlike traditional blogging platforms, ThoughtForge introduces a **live debate system embedded within every post**, transforming passive reading into **interactive intellectual engagement**.

---

## ✨ Core Concept

> 🧩 *Blog + IDE + Debate Arena*

Each blog post includes:
- A **central argument**
- A **live voting system**
- Community-driven **discussion + validation**

Readers don’t just consume content — they **participate in it**.

---

## 🔥 Key Features

### 📝 Content Management
- Create, edit, and delete blog posts
- Markdown-powered writing experience
- Live preview editor

### 💬 Interaction System
- Likes ❤️  
- Comments 💭  
- Bookmarks 🔖  
- **Live Debate Voting System ⚖️ (Unique Feature)**

### 👤 User System
- Authentication (JWT-based)
- Personalized dashboards
- Profile management

### 📊 Developer-Centric UI
- IDE-inspired layout
- Floating draggable panels
- Terminal-style notifications

---

## 🔄 Application Flow

```mermaid
flowchart TD
    A[User Enters ThoughtForge] --> B{Authenticated?}

    B -- No --> C[Sign Up / Login]
    B -- Yes --> D[Dashboard]

    D --> E[Explore Feed]
    D --> F[Create Post]
    D --> G[Profile / Analytics]

    E --> H[Open Blog Post]
    H --> I[Read Content]
    I --> J[Vote in Debate]
    I --> K[Like / Comment / Bookmark]

    F --> L[Write in Markdown Editor]
    L --> M[Live Preview]
    M --> N[Publish Post]

    N --> E
