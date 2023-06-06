const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const supabaseUrl = 'https://kbylaysxbafpbojdywtj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtieWxheXN4YmFmcGJvamR5d3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NTE1MTgsImV4cCI6MTk5OTQyNzUxOH0.Q_fS53HILFzs08uplWRnVz2VDVw_sOcuh3bp5le2lyg';
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

app.get('/produtos', async (req, res) => {
  try {
    const { data, error } = await supabase.from('produtos').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao consultar produtos.' });
  }
});

app.get('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('produtos')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao consultar o produto.' });
  }
});

app.post('/produtos', async (req, res) => {
  try {
    const { nome, preco } = req.body;
    const { data, error } = await supabase
      .from('produtos')
      .insert({ nome, preco })
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao cadastrar o produto.' });
  }
});

app.put('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const { data, error } = await supabase
      .from('produtos')
      .update({ nome, preco })
      .eq('id', id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao alterar o produto.' });
  }
});

app.delete('/produtos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('produtos')
      .delete()
      .eq('id', id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Falha ao deletar o produto.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
