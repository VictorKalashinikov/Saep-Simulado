"use strict";

const SUPABASE_URL = "https://pkjxtjlhybcnqvtysppn.supabase.co";

// Chave ANON / Public limpa e sem o sufixo .supabase.co no final
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBranh0amxoeWJjbnF2dHlzcHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzMzE2MDcsImV4cCI6MjEwOTkwNzYwN30.0DWvWEzNW9GxGcRtT-uPOOfYFek4CTRf0d5qhht8p9Q";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);