# Websocket (Jenifer Singh)

## UDP VS TCP

UDP - Fast (No acknowledgment)
TCP - reliable

Websocket uses TCP.

## HTTP

- Stateless protocol (Forgets everything after data transmission).
- Super reliable since it uses TCP behind the back.

## Why websocket?

- HTTP is stateless, connection gets terminated.
- Can't do real time communication using just HTTP.
- HTTP sends headers (increases the TCP payload size, not suitable for RTC).

## How does websocket works?

To establish a ws connection first we make a normal http request to the ws server, in the HTTP request there is a header called 'upgrade' with value 'websocket', the server
responds with status code 101, server asking client to switch (upgrade techically) from HTTP to websocket. Public key is exchanged b/w client and server to encrypt the connection...

## Websocket frames

Fin bit - Is this the final frame?
Op code - Command or data frame? (There are many op codes (hex codes basically), with different meaning)
Length - Payload's size
Extended length - Max. websocket frame length is 125B, if it is more than this specify.
Mask - Study (didn't understand)
Masking key - Study (didn't understand)
Payload data - The data that needs to be communicated.

Browser can't ping (server can ping and client can pong, this is unique to websocket).

Note: ws is a light weight lib, look into socket io.
