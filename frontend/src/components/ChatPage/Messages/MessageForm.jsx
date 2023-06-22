import { toast } from 'react-toastify';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquareFill } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRollbar } from '@rollbar/react';
import { useTranslation } from 'react-i18next';

import { useAuth, useSocket } from '../../../hooks';
import { selectors as channelsSelectors } from '../../../slices/channelsSlice';
import { chatSchema } from '../../../validation/validationSchema';

const MessageForm = () => {
  const auth = useAuth();
  const socket = useSocket();
  const rollbar = useRollbar();
  const { t } = useTranslation();
  const inputMessage = useRef(null);
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const formik = useFormik({
    initialValues: { messageText: '' },

    validationSchema: chatSchema(t('messageBody')),

    onSubmit: async (values, { resetForm }) => {
      const message = {
        body: values.messageText,
        channelId: currentChannelId,
        user: auth.user.username,
      };
      try {
        await socket.sendMessage(message);
        resetForm();
      } catch (error) {
        toast.error(t('errors.message'));
        rollbar.error('AddChannel', error);
      }
    },
  });

  useEffect(() => {
    if (inputMessage.current) {
      inputMessage.current.focus();
    }
  }, [currentChannelId]);

  useEffect(() => {
    if (formik.values.messageText === '') {
      inputMessage.current.focus();
    }
  }, [formik.values.messageText]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form noValidate onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup hasValidation={!formik.dirty || !formik.isValid}>

          <Form.Control
            ref={inputMessage}
            className="border-0 p-0 ps-2"
            name="messageText"
            type="text"
            placeholder={t('placeholders.newMessage')}
            aria-label={t('newMessage')}
            disabled={formik.isSubmitting}
            onChange={formik.handleChange}
            value={formik.values.messageText}
          />

          <Button variant="group-vertical" type="submit" disabled={!formik.dirty || !formik.isValid}>
            <ArrowRightSquareFill size={30} color="blue" />
            <span className="visually-hidden">{t('send')}</span>
          </Button>

        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
