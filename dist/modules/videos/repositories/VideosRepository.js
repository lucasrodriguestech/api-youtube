"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const uuid_1 = require("uuid");
const mysql_1 = require("../../../mysql");
class VideoRepository {
    create(request, response) {
        const { title, description, user_id } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)', [(0, uuid_1.v4)(), user_id, title, description], (error, result, fileds) => {
                connection.release();
                if (error) {
                    response.status(400).json(error);
                }
                response.status(200).json({ message: "Vídeo criado com sucesso" });
            });
        });
    }
    getVideo(request, response) {
        const { user_id } = request.body;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * from videos WHERE user_id = ?', [user_id], (error, results, fileds) => {
                connection.release();
                if (error) {
                    response.status(400).json({ error: "Erro ao buscar vídeos!" });
                }
                return response.status(200).json({ message: "Vídeos retornados com sucesso", videos: results });
            });
        });
    }
    searchVideos(request, response) {
        const { search } = request.query;
        mysql_1.pool.getConnection((err, connection) => {
            connection.query('SELECT * from videos WHERE description LIKE ?', [`%${search}%`], (error, results, fileds) => {
                connection.release();
                if (error) {
                    response.status(400).json({ error: "Erro ao buscar vídeos!" });
                }
                return response.status(200).json({ message: "Vídeos retornados com sucesso", videos: results });
            });
        });
    }
}
exports.VideoRepository = VideoRepository;
