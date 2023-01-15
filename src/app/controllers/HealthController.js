class HealthController {
  healthCheck(req, res) {
    res.status(200).json({
      status: 'OK',
      message: 'API IS UP!',
    });
  }
}

export default new HealthController();
