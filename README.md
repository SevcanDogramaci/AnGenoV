# AnGenoV

### How to install

```bash
git clone https://github.com/SevcanDogramaci/AnGenoV.git
```
### Run AnGenoV

```bash
cd AnGenoV/

virtualenv .venv

. .venv/bin/activate
```

##### Start server

```bash
cd server/

pip install -r requirements.txt

export FLASK_APP=application.py

flask run
```

##### Start web interface

```bash
cd web_interface/

npm install

sudo npm start
```
