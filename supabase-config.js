
"use strict";

//const SUPABASE_URL = "SUA_URL";
//const SUPABASE_KEY = "SUA_CHAVE_PUBLICAVEL";
//const SUPABASE_URL = "https://seu-projeto.supabase.co";
//const SUPABASE_KEY = "sb_publishable_sua-chave";

const SUPABASE_URL = "https://pkjxtjlhybcnqvtysppn.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBranh0amxoeWJjbnF2dHlzcHBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQzMzE2MDcsImV4cCI6MjEwOTkwNzYwN30.0DWvWEzNW9GxGcRtT-uPOOfYFek4CTRf0d5qhht8p9Q.supabase.co";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
