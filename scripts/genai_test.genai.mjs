script({
    title: "Shorten", // displayed in UI and Copilot Chat
    // also displayed but grayed out:
    description:
        "A prompt that shrinks the size of text without losing meaning",
})

// but the variable is appropriately delimited
const file = def("FILE", env.files)

// this appends text to the prompt
$`Shorten ${file}. Limit changes to minimum.`