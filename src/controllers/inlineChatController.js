import { Together } from "together-ai";

const together = new Together({ apiKey: '52000927390ba73cf01b04ac3b01106be953e62ad580d061ec99d95dafb83e79' });

const getEditedCode = async (req, res) => {
    const { query, code } = req.body;
    
    if (!query || !code) {
        return res.status(400).json({ message: 'Query and code are required.' });
    }

    const sysPrompt = `You are a helpful AI coding assistant.
You are given a user request/query and a code snippet, again, selected by the user.
Your task is to only modify the code snippet to fulfill the user request/query and nothing else.
You must not change the code snippet in any other way and output the edited code snippet without any backticks.`

    try {
        const response = await together.completions.create({
            model: "Qwen/Qwen2.5-Coder-32B-Instruct",
            messages: [
                { role: "system", content: sysPrompt },
                { role: "user"  , content: query     },
            ]
        });
        console.log(response.choices[0].text);
        res.json({ message: 'Code edited successfully', editedCode: response.choices[0].text });
    } catch (error) {
        res.status(500).json({ message: 'Error getting edited code', error: error.message });
    }
};

export default getEditedCode;