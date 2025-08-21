from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router
import uvicorn
import sys

app = FastAPI(title="Document Processing API")


# Add this block before including routers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Document Processing API"} 

if __name__ == "__main__" or sys.argv[0].endswith("app/main.py"):
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
