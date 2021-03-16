FROM python:3.8-alpine

RUN mkdir /code
WORKDIR /code

COPY requirements.txt ./
RUN pip install -U pip
RUN pip install -r requirements.txt
# RUN pip install -e .

COPY metrics metrics/
COPY migrations migrations/

EXPOSE 5000