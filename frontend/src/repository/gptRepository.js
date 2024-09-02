import { functions } from "@/lib/firebase"
import { httpsCallable } from "firebase/functions"

export default class GptRepository {
  async sendMessage(message, sendMessages, currentPosition) {
    try {
      const { lat, lng } = currentPosition;

      const useChatGpt = httpsCallable(functions, 'test', {
        timeout: 3600 * 1000,
      })

      const result = await useChatGpt({ message, sendMessages, lat, lng })

      return result.data
    } catch (e) {
      throw new Error(e.message)
    }

  }
}
