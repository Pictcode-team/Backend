import logging

from tenacity import after_log, before_log, retry, stop_after_attempt, wait_fixed


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def main() -> None:
    logger.info("Service finished initializing")


if __name__ == "__main__":
    main()
