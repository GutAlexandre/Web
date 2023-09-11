import asyncio
import traceback
import json
from fastapi import Request, WebSocket, WebSocketDisconnect
import asyncio
import traceback
from typing import Dict
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, Request, WebSocket, WebSocketDisconnect
from fastapi.templating import Jinja2Templates

app = FastAPI(title='Hardward Abstraction Layer (HAL v3.0)')
app.mount("/web", StaticFiles(directory="web"), name="web")

@app.get('/')
async def home():
    with open('web/index.html', 'r') as f:
        content = f.read()
    return HTMLResponse(content=content)

@app.get('/netflix')
async def home():
    with open('web/netflix.html', 'r') as f:
        content = f.read()
    return HTMLResponse(content=content)

@app.get('/monster')
async def home():
    with open('web/monster.html', 'r') as f:
        content = f.read()
    return HTMLResponse(content=content)



@app.get('/GutAlexandre')
async def home():
    with open('web/GutAlexandre.html', 'r') as f:
        content = f.read()
    return HTMLResponse(content=content)
