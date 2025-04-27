# Node.jsの公式イメージを使うよ（20バージョン）
FROM node:20

# 作業する場所を/appっていうフォルダにするよ
WORKDIR /app

# パッケージ情報（何をインストールするか）をコピー
COPY package*.json ./

# 必要なものをインストールする
RUN npm install

# プロジェクトの中身を全部コピー
COPY . .

# Next.jsのアプリをビルドする
RUN npm run build

# 外から3000番ポートを開ける
EXPOSE 3000

# アプリを起動する
CMD ["npm", "run", "start"]
