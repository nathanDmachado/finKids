import sys, json, os
from PySide6.QtWidgets import (
    QApplication, QWidget, QVBoxLayout, QLabel, QPushButton, QMessageBox
)
from PySide6.QtCore import Qt
from PySide6.QtGui import QFont

ARQUIVO_PERFIS = "perfis.json"
LIMITE_PERFIS = 5

def carregar_perfis():
    if not os.path.exists(ARQUIVO_PERFIS):
        return []
    with open(ARQUIVO_PERFIS, "r") as f:
        return json.load(f)

def salvar_perfis(lista):
    with open(ARQUIVO_PERFIS, "w") as f:
        json.dump(lista, f, indent=4)

class TelaPerfis(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Escolha um Perfil")
        self.setGeometry(300, 200, 400, 500)

        self.layout = QVBoxLayout()
        self.setLayout(self.layout)

        self.perfis = carregar_perfis()

        self.renderizar_perfis()
        self.setStyleSheet(self.estilo())

    def renderizar_perfis(self):
        self.layout.addWidget(QLabel("<h2 style='text-align:center'>Perfis Salvos</h2>"))

        for perfil in self.perfis:
            botao = QPushButton(f"{perfil['nome']} - Nível {perfil['nivel']} - 💰 {perfil['moedas']} moedas")
            botao.setObjectName("perfilBtn")
            botao.clicked.connect(lambda _, p=perfil: self.entrar_perfil(p))
            self.layout.addWidget(botao)

        self.botao_novo = QPushButton("➕ Criar Novo Perfil")
        self.botao_novo.setObjectName("novoBtn")
        self.botao_novo.clicked.connect(self.criar_novo_perfil)
        self.layout.addWidget(self.botao_novo)

        if len(self.perfis) >= LIMITE_PERFIS:
            self.botao_novo.setDisabled(True)
            self.botao_novo.setText("Limite de perfis atingido")

    def entrar_perfil(self, perfil):
        QMessageBox.information(self, "Entrar Perfil", f"Entrando no perfil: {perfil['nome']}")

    def criar_novo_perfil(self):
        nome = f"Jogador{len(self.perfis)+1}"
        novo = {"nome": nome, "nivel": 1, "moedas": 0}
        self.perfis.append(novo)
        salvar_perfis(self.perfis)
        QMessageBox.information(self, "Perfil Criado", f"Novo perfil '{nome}' criado!")
        self.reload()

    def reload(self):
        for i in reversed(range(self.layout.count())):
            self.layout.itemAt(i).widget().setParent(None)
        self.renderizar_perfis()

    def estilo(self):
        return """
        QPushButton#perfilBtn {
            background-color: #e6f0ff;
            border-radius: 12px;
            padding: 12px;
            font-size: 15px;
            margin-bottom: 10px;
        }

        QPushButton#perfilBtn:hover {
            background-color: #cce0ff;
            border: 1px solid #5aa9f9;
        }

        QPushButton#novoBtn {
            background-color: #d4f4dd;
            border-radius: 12px;
            padding: 12px;
            font-size: 15px;
            margin-top: 20px;
        }

        QPushButton#novoBtn:hover {
            background-color: #b8f2c8;
        }
        """

if __name__ == "__main__":
    app = QApplication(sys.argv)
    janela = TelaPerfis()
    janela.show()
    sys.exit(app.exec())
