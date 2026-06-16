exports.runCode = (req, res) => {
    const { code } = req.body;

    try {
        let output = "";

        const originalLog = console.log;

        console.log = (...args) => {
            output += args.join(" ") + "\n";
        };

        eval(code);

        console.log = originalLog;

        res.json({
            success: true,
            output,
        });
    } catch (error) {
        res.json({
            success: false,
            output: error.message,
        });
    }
};