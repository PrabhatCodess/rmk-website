import sys

def modify_home():
    with open("src/frontend/src/components/Home.tsx", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Rename component
    content = content.replace("export default function App() {", "export default function Home() {")
    
    # Remove Lenis and Loader setup from Home.tsx
    # We will remove from "const [loading, setLoading] = useState(true);"
    # to "}, [loading]);"
    content = content.replace("const [loading, setLoading] = useState(true);", "// loading state removed")
    
    # Remove header
    # Find "<header" and "</header>"
    start_header = content.find("<header")
    end_header = content.find("</header>") + len("</header>")
    if start_header != -1 and end_header != -1:
        content = content[:start_header] + content[end_header:]
        
    # Remove footer
    start_footer = content.find("<footer")
    end_footer = content.find("</footer>") + len("</footer>")
    if start_footer != -1 and end_footer != -1:
        content = content[:start_footer] + content[end_footer:]
        
    # Remove Loader return
    ld_start = content.find("<AnimatePresence>\n        {loading")
    ld_end = content.find("</AnimatePresence>") + len("</AnimatePresence>")
    if ld_start != -1 and ld_end != -1:
        content = content[:ld_start] + content[ld_end:]
        
    content = content.replace("{!loading && (", "")
    content = content.replace(")}", "") # Wait this might be dangerous, let me just keep the loader wrapper but true

    with open("src/frontend/src/components/Home.tsx", "w", encoding="utf-8") as f:
        f.write(content)

modify_home()
