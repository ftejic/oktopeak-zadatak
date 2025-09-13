# Oktopeak zadatak

Jednostavna React aplikacija za pracenje poslova, generisanje zahvalnica i upravljanje statusom aplikacija.

## Funkcionalnosti

- Dodavanje novih poslova sa firmom, pozicijom i statusom.
- Automatsko generisanje thank-you poruka koristeci OpenAI Chat Completions API.
- Filtriranje poslova po statusu (Applied, Interview, Offer, Rejected).
- Sortiranje poslova po datumu kreiranja (rastuce/opadajuce).
- Izmena statusa i brisanje poslova.
- Podaci se cuvaju u `localStorage`

> Napomena: Projekat koristi **Chat Completions API** umesto novijeg Responses API, jer direktni pozivi sa browser-a na novi Responses API stvaraju probleme sa autentifikacijom.

## Tehnologije

- React + TypeScript
- Vite
- Tailwind CSS
- OpenAI Chat Completions API
- `localStorage` za cuvanje podataka

## Pokretanje aplikacije

1. **Klonirati repozitorijum**  
   ```bash
   git clone https://github.com/ftejic/oktopeak-zadatak.git  
   cd oktopeak-zadatak
   ```
2. **Instalirati zavisnosti**  
    ```bash
    npm install
    ```
3. **Postaviti OpenAI API key**  
    Kreirati .env.local i u njemu napisati VITE_OPENAI_API_KEY=openai_api_kljuc

4. **Pokrenuti aplikaciju**  
    ```bash
    npm run dev
    ```
5. **Otvoriti http://localhost:5173 u browseru**  
