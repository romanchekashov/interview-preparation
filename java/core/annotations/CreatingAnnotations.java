package core.annotations;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @see  <a href="https://youtu.be/DkZr7_c9ry8">Annotations In Java Tutorial - How To Create And Use Your Own Custom Annotations</a>
 */
public class CreatingAnnotations {
  public static void main(String[] args) throws InvocationTargetException, IllegalAccessException {
    Cat myCat = new Cat();

    for (Method method: myCat.getClass().getMethods()) {
      if (method.isAnnotationPresent(RunImmediately.class)) {
        RunImmediately annotation = method.getAnnotation(RunImmediately.class);
        for (int i = 0; i < annotation.times(); i++) {
          method.invoke(myCat);
        }
      }
    }
  }
}
