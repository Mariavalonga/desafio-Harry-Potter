const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'atividade_harry_potter',
  password: 'ds564',
  port:  7007,
});
app.use(express.json());
app.post('/bruxos', async (req, res) => {
    const { nome, idade, casa, habilidade, status_sangue } = req.body;


    const tiposSangueValidos = ['trouxa', 'mestiço', 'sangue puro'];
    if (!tiposSangueValidos.includes(status_sangue)) {
        return res.status(400).json({ error: 'Tipo de sangue inválido. Escolha entre trouxa, mestiço ou sangue puro.' });
    }

    const tiposCasasValidas = ['Grifinória', 'Sonserina', 'Lufa-Lufa', 'Corvinal' ];
    if (!tiposCasasValidas.includes(casa)) {
        return res.status(400).json({ error: 'Casa inválida, escolha entre Grifinória, Sonserina, Lufa-Lufa ou Corvinal' });
    }

    const query = 'INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nome, idade, casa, habilidade, status_sangue];

    try {
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao inserir o bruxo:', error);
        res.status(500).json({ error: 'Erro ao inserir o bruxo' });
    }
});


app.get('/bruxos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bruxos');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar os bruxos:', error);
        res.status(500).json({ error: 'Erro ao buscar os bruxos' });
    }
    });

    app.get('/bruxos/:id', async (req, res) => {
        const id = req.params.id;
    
        try {
            const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
    
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Bruxo não encontrado' });
            }
    
            res.json(result.rows[0]);
        } catch (error) {
            console.error('Erro ao buscar o bruxo:', error);
            res.status(500).json({ error: 'Erro ao buscar o bruxo' });
        }
    });
    
    app.put('/bruxos/:id', async (req, res) => {
        const id = req.params.id;
        const { nome, idade, casa, habilidade, status_sangue } = req.body;
    
        const query = 'UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status_sangue = $5 WHERE id = $6 RETURNING *';
        const values = [nome, idade, casa, habilidade, status_sangue, id];
    
        try {
            const result = await pool.query(query, values);
            if (result.rowCount === 0) {
        
                res.status(404).json({ error: 'Bruxo não encontrado' });
            } else {
                res.status(200).json({ message: 'Bruxo atualizado com sucesso', updatedBruxo: result.rows[0] });
            }
        } catch (error) {
            console.error('Erro ao atualizar o bruxo:', error);
            res.status(500).json({ error: 'Erro ao atualizar o bruxo' });
        }
    });
    
    

    app.delete('/bruxos/:id', async (req, res) => {
        const id = req.params.id;
        const query = 'DELETE FROM bruxos WHERE id = $1';
    
    try {
        await pool.query(query, [id]);
        res.send('Bruxo excluído!');
    } catch (error) {
        console.error('Erro ao excluir o bruxo:', error);
        res.status(500).json({ error: 'Erro ao excluir o bruxo' });
    }
    });


    app.get('/varinhas', async (req, res) => {
        try {
            const result = await pool.query('SELECT * FROM varinhas');
            res.json(result.rows);
        } catch (error) {
            console.error('Erro ao buscar as varinhas:', error);
            res.status(500).json({ error: 'Erro ao buscar as varinhas' });
        }
        });

        app.get('/varinhas/:id', async (req, res) => {
            const id = req.params.id;
        
            try {
                const result = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: 'Varinha não encontrada' });
                }
        
                res.json(result.rows[0]);
            } catch (error) {
                console.error('Erro ao buscar a varinha:', error);
                res.status(500).json({ error: 'Erro ao buscar a varinha' });
            }
        });

        app.put('/varinhas/:id', async (req, res) => {
            const id = req.params.id;
            const { material, comprimento, nucleo, data_fabricacao } = req.body;
            const query = 'UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5 RETURNING *';
            const values = [material, comprimento, nucleo, data_fabricacao, id];
        
        try {
            await pool.query(query, values);
            res.send('Varinha atualizada');

        } catch (error) {
            console.error('Erro ao atualizar a varinha:', error);
            res.status(500).send( 'Erro ao atualizar a varinha' );
        }
        });

        app.delete('/varinhas/:id', async (req, res) => {
            const id = req.params.id;
            const query = 'DELETE FROM varinhas WHERE id = $1';
            try {
                await pool.query(query, [id]);
                res.send('Varinha excluída');
            } catch (error) {
                console.error('Erro ao excluir a varinha:', error);
                res.status(500).json({ error: 'Erro ao excluir a varinha' });
            }
        });

    
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/', (req, res) => {
    res.send('Servidor está rodando!');
});

