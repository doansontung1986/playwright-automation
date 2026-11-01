FROM node:22-slim

# Nên khóa version cụ thể. Xem version mới nhất bằng: npm view allure version
ARG ALLURE_VERSION=3.22.1
RUN npm install -g allure@${ALLURE_VERSION} && npm cache clean --force

ENV ALLURE_NO_ANALYTICS=true
WORKDIR /workspace
ENTRYPOINT ["allure"]
CMD ["--help"]